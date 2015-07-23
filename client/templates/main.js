Session.setDefault('isPlaying', false);   //当前是否正在播放

Template.main.rendered = function()
{
	$("#playerDiv").hide();
	//初始化 
	getSystemSetting();
};

Meteor.startup(function () {
    $('body').hammer();
});

Template.ionNavBar.events({
	'click .title': function () {
       Router.go('bookMenu');
	},'click .pull-left': function () {
       Router.go('menu');
	},'click #btnVoice': function() {
		Session.set('isPlayView', ! Session.get('isPlayView'));
		if(Session.get('isPlayView')){
			$("#playerDiv").show();
		}else{
			$("#playerDiv").hide();
		}
	}
});
Template.main.helpers({
	lectionList: function () {
		var currentBook = Session.get('currentBook');
		var currentChapter = Session.get('currentChapter');
        var index=Session.get("index");
        getLection(currentBook, currentChapter,index);
        return Session.get('lectionList');
	},
	bookName: function () {
		return Session.get('currentBookName'); 
	},
	chapterSN: function () {
		return Session.get('currentChapter');
	},
	position: function(){
		return Session.get('timeValue');
	},
	section: function(){
		var position = Session.get('timeValue');
		var sectionSN = getCurrSection(position);
		return sectionSN;         
	},
	dur:function(){
		return Session.get('dur');
	},
	isPlaying: function () {
		return Session.get('isPlaying');
	}

});
Template.main.events({
    "click #btnNext": function(){
        Session.set("index",1);
        Session.set("keyWordBlog",2);
        nextChapter();
        BibleScrollTop();
    },
    "click #btnPrev": function(){
        Session.set("index",1);
        Session.set("keyWordBlog",2);
        lastChapter();
    },
    'swipeleft #divBible': function(event) {
        event.stopPropagation();
    },
    'hold #divBible': function(event) {
        event.stopPropagation();
    },
	'click button[data-play]': function () {
		//播放
		Session.set('isPlaying', ! Session.get('isPlaying'));
		if(Session.get('isPlaying')){
			abcGlobal.media.playAudio();
			Session.set('lrcStyle',true);
		}else{
			abcGlobal.media.pauseAudio();
			Session.set('lrcStyle',false);
            $("#divBible span").removeClass("blue");
		}
	},'click button[data-skipbackward]': function () {

        BibleScrollTop();
		lastChapter();

		//播放
		abcGlobal.media.initAudio();
		if(Session.get('isPlaying')){
			abcGlobal.media.playAudio();
		}
        // 记录本次读经位置
		setSetting(Session.get('currentBook'), Session.get('currentChapter'));

	},'click button[data-skipforward]': function () {

        BibleScrollTop();
		nextChapter();

		//播放
		abcGlobal.media.initAudio();
		if(Session.get('isPlaying')){
			abcGlobal.media.playAudio();
		}

        // 记录本次读经位置
		setSetting(Session.get('currentBook'), Session.get('currentChapter'));
	},'click .ion-ios-undo': function () {
		//判断文件是否存在
		// volumeSN 书卷名 bookSN 书卷号 chapterSN 章号 
		download(Session.get('selectedBookName'), Session.get('selectedBook'), Session.get('currentChapter'));
	}
})
