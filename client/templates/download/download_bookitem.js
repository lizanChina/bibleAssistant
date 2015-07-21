Template.download_bookItem.events({
	'click': function () {
		
		Session.set('selectedBook', this.bookSN);
		Session.set('selectedChapterCount', this.chapterCount);
		Session.set('selectedBookName', this.fullName);
		//alert(Session.get('selectedBook'));
		//Router.go('chaptersMenu');
	},
	'click #form1': function () {
		var radio = document.getElementsByName("form1");
		var radioLength = radio.length;
		for(var i = 0;i < radioLength;i++)
		{
			if(radio[i].checked)
			{
				var radioValue = radio[i].value;
				alert(radioValue);
			}
		}
	},
	'click .item':function(){
	// 	if(confirm('这是选择是否的对话框?'))
	// 	{
	// 		alert('选择了是');
	// 		for(var i = 0;i<Session.get('selectedChapterCount');i++)
	// 		{
	// 			var chapterSN = i + 1;
	// 			alert(Session.get('selectedBookName') + "-" + Session.get('selectedBook') + "-" + chapterSN);
	// 		//download(Session.get('selectedBookName'), Session.get('selectedBook'), chapterSN);
	// 		};
	// 	}
	// 	else
	// 	{
	// 		alert('选择了否'); 
	// 	}

	// }
	IonPopup.confirm({
		title: '提示信息',
		template: '是否下载本章全部语音？',
		okText: '确定',
		cancelText:"取消",   
		onOk: function() {
			console.log('Confirmed');
			//alert("选择了是");
			for(var i = 0;i<Session.get('selectedChapterCount');i++)
			{
				var chapterSN = i + 1;
				//alert(Session.get('selectedBookName') + "-" + Session.get('selectedBook') + "-" + chapterSN);
				download(Session.get('selectedBookName'), Session.get('selectedBook'), chapterSN);
			};
		},
		onCancel: function() {
		console.log('Cancelled');
		//alert("选择了否");
		},
	});
},
});


