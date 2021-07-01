console.log('entering');

document.querySelector("#count-now").addEventListener('click', ()=> {
	function modifyDOM() {
        //You can play with your DOM here or check URL against your regex
		let allText = "";
		let allElms = document.querySelectorAll(".author.h-text-size--14") || [];
		if (allElms) allElms = Array.from(allElms);
		let count = 0;
		allElms.forEach((e,i) => {
			const username = e.innerText.replace(/\n/,'').trim();
			if(username == 'rkk09') {				
				const elm = e.closest('.l-row.l-row__fixed--left').querySelector('.js-post__content-text.restore.h-wordwrap');				
				allText += `Reply ${++count}: ` + elm.innerText.replace(/[\n,.]/g, ' ').replace(/[ ]{2,}/gi," ").trim().split(' ').length + '\n';
			}
		})
		
        return allText;
    }

    //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
    chrome.tabs.executeScript({
        code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
    }, (results) => {
        //Here we have just the innerHTML and not DOM structure
		countReplies(results[0]);
    });
})

document.querySelector("#count-article").addEventListener('click', ()=> {
	function modifyDOM() {
        //You can play with your DOM here or check URL against your regex
		let allText = "";
		let allElm = document.querySelector(".c-Article__paragraphs-wrap");				
		allText = `Article Count: ` + (allElm.innerText.replace(/[\n,.]/g, ' ').replace(/[ ]{2,}/gi," ").trim().split(' ').length-21) + '\n';
		
        return allText;
    }

    //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
    chrome.tabs.executeScript({
        code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
    }, (results) => {
        //Here we have just the innerHTML and not DOM structure
		document.querySelector("#word-count").innerHTML  = results;
    });
})

document.querySelector("#count-replies").addEventListener('click', ()=> {
	function modifyDOM() {
        //You can play with your DOM here or check URL against your regex
		let allText = document.head.querySelectorAll("script")[3].innerHTML;
				
        return allText;
    }

    //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
    chrome.tabs.executeScript({
        code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
    }, (results) => {
        //Here we have just the innerHTML and not DOM structure
		const scriptelm = document.createElement("SCRIPT");
		scriptelm.innerHTML = results;
		document.body.append(scriptelm);
		let allText = "";
		window.immiObj.posts.posts.forEach(e=>{
			allText += 'Replies ' + new Date(window.immiObj.posts.posts[0].createdOn).toLocaleDateString() + ': ' + e.replyContent.replace(/[\n,.<br/>]/g, ' ').replace(/[ ]{2,}/gi," ").split(' ').length + '\n';
		});
		document.querySelector("#word-count").innerHTML  = results;
    });
})

function countReplies (allText) {
	document.querySelector("#word-count").innerHTML  = allText;
}