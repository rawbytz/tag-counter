# Tag Counter Bookmarklet for WorkFlowy
- Tag counting utility and replacement for WFcount.
- With no search, displays tag counts for all descendants of the zoom parent.
- With search, displays tag counts for all VISIBLE tags.
- Tags are clickable, and will search that level for the tag.
- Tags are sorted by name.
- To sort tags by frequency, set sortByCount=true near the beginning of the code.

![Tag Counter](https://i.imgur.com/Bzpzyco.png)

## Installation: Drag this link to your bookmarks bar:

<!-- EDIT!! sortByCount=false,showCompleted=true -->
<a href="javascript:(function tagCounter_1_7(sortByCount=false,showCompleted=true){if(typeof sortByCount!==&quot;boolean&quot;)sortByCount=false;if(typeof showCompleted!==&quot;boolean&quot;)showCompleted=true;function toastMsg(str,sec,err){WF.showMessage(str.bold(),err);setTimeout(()=&gt;WF.hideMessage(),(sec||2)*1e3)}function applyToEachItem(functionToApply,parent){functionToApply(parent);for(let child of parent.getChildren()){applyToEachItem(functionToApply,child)}}function findMatchingItems(itemPredicate,parent){const matches=[];function addIfMatch(item){if(itemPredicate(item)){matches.push(item)}}applyToEachItem(addIfMatch,parent);return matches}function isVisibleSearchResult(item){const isVisible=WF.completedVisible()||!item.isWithinCompleted();return item.data.search_result&amp;&amp;isVisible}function getWfTagsList(item){const tagCounts=item.isMainDocumentRoot()?getRootDescendantTagCounts():item.getTagManager().descendantTagCounts;const tagsList=tagCounts?tagCounts.getTagList():[];return tagsList.sort((a,b)=&gt;a.tag.localeCompare(b.tag))}function getItemTags(item){return WF.getItemNameTags(item).concat(WF.getItemNoteTags(item)).map(t=&gt;t.tag.toLowerCase())}function getAllTags(items){const tags=[];items.forEach(item=&gt;{tags.push(...getItemTags(item))});return tags}function getVisibleTagsList(item){const visibleItems=findMatchingItems(isVisibleSearchResult,item),tags=getAllTags(visibleItems),uniqueTags=new Set(tags),tagList=[];uniqueTags.forEach(uTag=&gt;{let uCount=tags.filter(t=&gt;t===uTag).length;tagList.push({tag:uTag,count:uCount})});return tagList.sort((a,b)=&gt;a.tag.localeCompare(b.tag))}if(!WF.completedVisible()&amp;&amp;showCompleted)WF.toggleCompletedVisible();const current=WF.currentItem();const tagCounts=WF.currentSearchQuery()?getVisibleTagsList(current):getWfTagsList(current);if(tagCounts.length===0){return void toastMsg(&quot;No tags found.&quot;,2,true)}if(sortByCount)tagCounts.sort((a,b)=&gt;b.count-a.count);const url=`${current.getUrl()}${current.isMainDocumentRoot()?&quot;#&quot;:&quot;&quot;}`;const total=tagCounts.reduce((sum,t)=&gt;t.count+sum,0),padMax=total.toString().length,search=WF.currentSearchQuery()?WF.currentSearchQuery()+&quot; : &quot;:&quot;&quot;;tagPre=tagCounts.map(t=&gt;`${t.count.toString().padStart(padMax,&quot; &quot;)}\t&lt;a class=&quot;tagLinks&quot; href=&quot;${url}?q=${encodeURIComponent(t.tag)}&quot;&gt;${t.tag}&lt;/a&gt;`);WF.showAlertDialog(`&lt;pre&gt;&lt;br&gt;${tagPre.join('&lt;br&gt;')}&lt;br&gt;&lt;br&gt;&lt;b&gt;${total}\tTOTAL&lt;/b&gt;&lt;/pre&gt;`,search+current.getNameInPlainText());const intervalId=setInterval((function(){let tagLinks=document.getElementsByClassName(&quot;tagLinks&quot;);if(tagLinks){clearInterval(intervalId);for(let tagLink of tagLinks){tagLink.addEventListener('click',(function(){WF.hideDialog()}),false)}}}),50)})();">tagCounter</a>

## Links:
- [Source code](https://github.com/rawbytz/tag-counter/blob/master/tagCounter.js)
- [Time Tag Counter is here](https://rawbytz.github.io/time-tag-counter/)
- [rawbytz Blog](https://rawbytz.wordpress.com)

<!-- 
LINKS REFERENCING THIS

@BLOGGER Redirect https://rawbytz.blogspot.com/p/tag-counter-bookmarklet-for-workflowy.html

@BLOGGER Redirect https://rawbytz.blogspot.com/p/wfcount-bookmarklet.html

 -->
