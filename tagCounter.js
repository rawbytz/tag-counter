(function tagCounter_1_7(sortByCount = '_sortByCount_', showCompleted = '_showCompleted_') {

  if (typeof sortByCount !== "boolean") sortByCount = false;
  if (typeof showCompleted !== "boolean") showCompleted = true;

  function toastMsg(str, sec, err) {
    WF.showMessage(str.bold(), err);
    setTimeout(() => WF.hideMessage(), (sec || 2) * 1000);
  }
  function applyToEachItem(functionToApply, parent) {
    functionToApply(parent);
    for (let child of parent.getChildren()) {
      applyToEachItem(functionToApply, child);
    }
  }
  function findMatchingItems(itemPredicate, parent) {
    const matches = [];
    function addIfMatch(item) {
      if (itemPredicate(item)) {
        matches.push(item);
      }
    }
    applyToEachItem(addIfMatch, parent);
    return matches;
  }
  // This includes items without matches
  function isVisibleSearchResult(item) {
    const isVisible = WF.completedVisible() || !item.isWithinCompleted();
    return item.data.search_result && isVisible
  }
  function getWfTagsList(item) {
    const tagCounts = item.isMainDocumentRoot() ? getRootDescendantTagCounts() : item.getTagManager().descendantTagCounts;
    const tagsList = tagCounts ? tagCounts.getTagList() : [];
    return tagsList.sort((a, b) => (a.tag.localeCompare(b.tag)));
  }
  function getItemTags(item) {
    return WF.getItemNameTags(item).concat(WF.getItemNoteTags(item)).map((t) => t.tag.toLowerCase())
  }
  function getAllTags(items) {
    const tags = [];
    items.forEach((item) => {
      tags.push(...getItemTags(item))
    });
    return tags
  }
  function getVisibleTagsList(item) {
    const visibleItems = findMatchingItems(isVisibleSearchResult, item),
      tags = getAllTags(visibleItems),
      uniqueTags = new Set(tags),
      tagList = [];
    uniqueTags.forEach((uTag) => {
      let uCount = tags.filter((t) => t === uTag).length;
      tagList.push({ tag: uTag, count: uCount });
    });
    return tagList.sort((a, b) => a.tag.localeCompare(b.tag))
  }
  if (!WF.completedVisible() && showCompleted) WF.toggleCompletedVisible();
  const current = WF.currentItem();
  const tagCounts = WF.currentSearchQuery() ? getVisibleTagsList(current) : getWfTagsList(current);
  if (tagCounts.length === 0) {
    return void toastMsg("No tags found.", 2, true);
  }
  if (sortByCount) tagCounts.sort((a, b) => (b.count - a.count));
  const url = `${current.getUrl()}${current.isMainDocumentRoot() ? "#" : ""}`;
  const total = tagCounts.reduce((sum, t) => t.count + sum, 0),
    padMax = total.toString().length,
    search = WF.currentSearchQuery() ? WF.currentSearchQuery() + " : " : "";
  tagPre = tagCounts.map((t) => `${t.count.toString().padStart(padMax, " ")}\t<a class="tagLinks" href="${url}?q=${encodeURIComponent(t.tag)}">${t.tag}</a>`);
  WF.showAlertDialog(`<pre><br>${tagPre.join('<br>')}<br><br><b>${total}\tTOTAL</b></pre>`, search + current.getNameInPlainText());
  const intervalId = setInterval(function () {
    let tagLinks = document.getElementsByClassName("tagLinks");
    if (tagLinks) {
      clearInterval(intervalId);
      for (let tagLink of tagLinks) {
        tagLink.addEventListener('click', function () {
          WF.hideDialog()
        }, false);
      }
    }
  }, 50);
})();