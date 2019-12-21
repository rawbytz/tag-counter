# Tag Counter Bookmarklet for WorkFlowy
- Tag counting utility and replacement for WFcount.
- With no search, displays tag counts for all descendants of the zoom parent.
- With search, displays tag counts for all VISIBLE tags.
- Tags are clickable, and will search that level for the tag.
- Tags are sorted by name.
- To sort tags by frequency, set sortByCount=true near the beginning of the code.

![Tag Counter](https://i.imgur.com/Bzpzyco.png)

## Installation: Drag this link to your bookmarks bar:

<!-- sortByCount=false,showCompleted=true -->
<a href="javascript:(function&#32;tagCounter_1_6(sortByCount=false,showCompleted=true){if(typeof&#32;sortByCount!==&quot;boolean&quot;)sortByCount=false;if(typeof&#32;showCompleted!==&quot;boolean&quot;)showCompleted=true;function&#32;toastMsg(str,sec,err){WF.showMessage(str.bold(),err);setTimeout(()=&gt;WF.hideMessage(),(sec||2)*1e3)}function&#32;applyToEachItem(functionToApply,parent){functionToApply(parent);for(let&#32;child&#32;of&#32;parent.getChildren()){applyToEachItem(functionToApply,child)}}function&#32;findMatchingItems(itemPredicate,parent){const&#32;matches=[];function&#32;addIfMatch(item){if(itemPredicate(item)){matches.push(item)}}applyToEachItem(addIfMatch,parent);return&#32;matches}function&#32;isVisibleSearchResult(item){const&#32;isVisible=WF.completedVisible()||!item.isWithinCompleted();return&#32;item.data.search_result&amp;&amp;isVisible}function&#32;getWfTagsList(item){const&#32;tagCounts=item.isMainDocumentRoot()?getRootDescendantTagCounts():item.getTagManager().descendantTagCounts;const&#32;tagsList=tagCounts?tagCounts.getTagList():[];return&#32;tagsList.sort((a,b)=&gt;a.tag.localeCompare(b.tag))}function&#32;getItemTags(item){return&#32;WF.getItemNameTags(item).concat(WF.getItemNoteTags(item)).map(t=&gt;t.tag.toLowerCase())}function&#32;getAllTags(items){const&#32;tags=[];items.forEach(item=&gt;{tags.push(...getItemTags(item))});return&#32;tags}function&#32;getVisibleTagsList(item){const&#32;visibleItems=findMatchingItems(isVisibleSearchResult,item),tags=getAllTags(visibleItems),uniqueTags=new&#32;Set(tags),tagList=[];uniqueTags.forEach(uTag=&gt;{let&#32;uCount=tags.filter(t=&gt;t===uTag).length;tagList.push({tag:uTag,count:uCount})});return&#32;tagList.sort((a,b)=&gt;a.tag.localeCompare(b.tag))}if(!WF.completedVisible()&amp;&amp;showCompleted)WF.toggleCompletedVisible();const&#32;current=WF.currentItem();const&#32;tagCounts=WF.currentSearchQuery()?getVisibleTagsList(current):getWfTagsList(current);if(tagCounts.length===0){return&#32;void&#32;toastMsg(&quot;No&#32;tags&#32;found.&quot;,2,true)}if(sortByCount)tagCounts.sort((a,b)=&gt;b.count-a.count);const&#32;url=`${current.getUrl()}${current.isMainDocumentRoot()?&quot;#&quot;:&quot;&quot;}`;const&#32;total=tagCounts.reduce((sum,t)=&gt;t.count+sum,0),padMax=total.toString().length,search=WF.currentSearchQuery()?WF.currentSearchQuery()+&quot;&#32;:&#32;&quot;:&quot;&quot;;tagPre=tagCounts.map(t=&gt;`${t.count.toString().padStart(padMax,&quot;&#32;&quot;)}\t&lt;a&#32;class=&quot;tagLinks&quot;&#32;href=&quot;${url}?q=${encodeURIComponent(t.tag)}&quot;&gt;${t.tag}&lt;/a&gt;`);WF.showAlertDialog(`&lt;pre&gt;&lt;br&gt;${tagPre.join('&lt;br&gt;')}&lt;br&gt;&lt;br&gt;&lt;b&gt;${total}\tTOTAL&lt;/b&gt;&lt;/pre&gt;`,search+current.getNameInPlainText());setTimeout((function(){const&#32;tagLinks=document.getElementsByClassName(&quot;tagLinks&quot;);for(let&#32;tagLink&#32;of&#32;tagLinks){tagLink.addEventListener('click',(function(){WF.hideDialog()}),false)}}),100)})();">tagCounter</a>


## Links:
- [Source code](https://github.com/rawbytz/tag-counter/blob/master/tagCounter.js)
- [rawbytz Blog](https://rawbytz.wordpress.com)

