// ==UserScript==
// @name           wheel reloader
// @namespace      https://github.com/himuro-majika
// @description    Reloads page by mouse wheel on page bottom
// @description    マウスホイールでリロードしちゃう
// @grant          none
// @include        *

// ==/UserScript==
(function () {
/*
ステータスバーへの表示はFirefox本体のオプションから
コンテンツ > JavaScriptの詳細設定 > ステータスバーのテキストを変更する
のチェックを入れないと使えません
*/
/*
To show status bar message, please check the firefox option
"content > Advanced JavaScript Settings > Change status bar text".
*/
	var s = 4;//回ホイールをページ末尾で下に回すとリロード
	//Number of times wheel down on page bottom to reload.

	var scrltop = true;//trueにするとリロード時にページ先頭に戻ります
	//When this is true scrolls to top on reloading the page.

	var t;
	var n = 0;
	window.addEventListener("wheel",function (e) {
		window.clearTimeout(t);
		var y = window.scrollY;
		var ym = getScrollMaxY();
		if (e.deltaY > 0 && y >= ym) {
			n++;
			window.status = "リロードぢから: " + parseInt(n * 100 / s) + "%";
			if (n == s) {
				tm();
				location.reload();
				return;
			}
			else
				t = window.setTimeout(tm,1000);
		}
		else
			tm();
		return;
	} ,false);
	function tm() {
		n = 0;
		window.status="";
		return;
	}

	/*  リロード時にページ先頭にスクロール  */
	window.addEventListener("unload",function() {
		if (scrltop){
			window.scrollTo(0, 0);
		}
	} ,false);

	/* ページ末尾判定 */
	function getScrollMaxY() {
		var innerh;
		var yWithScroll;
		if ( window.innerHeight ) {
			 innerh = window.innerHeight;
		}
		else {
			 innerh = document.body.clientHeight;
		}
		if ( window.innerHeight && window.scrollMaxY ) {
			yWithScroll = window.innerHeight + window.scrollMaxY;
		}
		else if ( document.body.scrollHeight > document.body.offsetHeight ) {
			yWithScroll = document.body.scrollHeight;
		}
		else {
			yWithScroll = document.body.offsetHeight;
		}
		return yWithScroll - innerh;
	}

})();
