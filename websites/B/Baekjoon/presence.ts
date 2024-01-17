const presence = new Presence({
		clientId: "1197126882597015674",
	}),
	path = location.pathname,
	timeElapsed = ~~(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const { pathname } = document.location,
		presenceData: PresenceData = {
			largeImageKey:
				"https://i.imgur.com/nD4KiGw.png",
			startTimestamp: timeElapsed,
		};

	if (pathname === "/") {
		presenceData.details = "백준(BOJ) 홈";
	}else if(pathname.match(/^\/login/)){
		presenceData.details = "백준(BOJ) 로그인 페이지";
	}
	else if(pathname.match(/^\/problem\/\d/)||pathname.match(/^\/submit\/\d/)||pathname.match(/^\/problem\/history\/\d/)||
	pathname.match(/^\/problem\/status\/\d/)||pathname.match(/^\/short\/status\/\d/)){
		let problem_number = document.querySelector<HTMLSpanElement>("title").textContent.trim().split('번')[0];
		presenceData.details = document.title;
		presenceData.buttons = [
			{
				label: problem_number+"번 문제 바로가기",
				url: "https://www.acmicpc.net"+pathname
			}
		];
	}else if(pathname.match(/^\/problem\/\d/)||pathname.match(/^\/submit\/\d/)||
	pathname.match(/^\/problem\/status\/\d/)||pathname.match(/^\/short\/status\/\d/)){
		let problem_number = document.querySelector<HTMLSpanElement>("title").textContent.trim().split('번')[0];
		presenceData.details = document.title;
		presenceData.buttons = [
			{
				label: problem_number+"번 문제 바로가기",
				url: "https://www.acmicpc.net"+pathname
			}
		];
	}
	
	else if(pathname.match(/^\/user\/\w+/)){
		let username = document.querySelector<HTMLSpanElement>("title").textContent.trim().split(' ')[0];
		presenceData.details = username + " 유저 정보 보는중";
		presenceData.buttons = [
			{
				label: "유저 "+username+" 바로가기",
				url: "https://www.acmicpc.net"+pathname
			}
		];
	}else if(pathname.match(/^\/workbook\/view\/(\d+)/)){
		let workbook = document.querySelector<HTMLSpanElement>("h1>span").textContent.trim();
		presenceData.details = "문제집 보는중";
		presenceData.state =  workbook;
		presenceData.buttons = [
			{
				label: "문제집 바로가기",
				url: "https://www.acmicpc.net"+pathname
			}
		];
	}else if(pathname.match(/^\/workbook\/top/)){
		let top_workbook = document.querySelector<HTMLSpanElement>("title").textContent.trim().split(' - ')[1];
		presenceData.details = "인기 문제집 보는중";
		presenceData.state = top_workbook
		presenceData.buttons = [
			{
				label: "인기 문제집 "+top_workbook+" 바로가기",
				url: "https://www.acmicpc.net"+pathname
			}
		];
	}else if(pathname.match(/^\/workbook\/codeplus/)){
		let top_workbook = document.querySelector<HTMLSpanElement>("title").textContent.trim().split(' - ')[1];
		presenceData.details = "코드플러스 문제집 보는중";
		presenceData.state = top_workbook
		presenceData.buttons = [
			{
				label: "코드플러스 문제집 "+top_workbook+" 바로가기",
				url: "https://www.acmicpc.net"+pathname
			}
		];
	}else if(pathname.match(/^\/workbook\/series/)){
		let top_workbook = document.querySelector<HTMLSpanElement>("title").textContent.trim().split(' - ')[1];
		presenceData.details = "시리즈 문제집 보는중";
		presenceData.state = top_workbook
		presenceData.buttons = [
			{
				label: "시리즈 문제집 "+top_workbook+" 바로가기",
				url: "https://www.acmicpc.net"+pathname
			}
		];
	}else if(pathname.match(/^\/workbook\/public/)){
		let top_workbook = document.querySelector<HTMLSpanElement>("title").textContent.trim().split(' - ')[1];
		presenceData.details = "공개 문제집 보는중";
		presenceData.state = top_workbook
		presenceData.buttons = [
			{
				label: "공개 문제집 "+top_workbook+" 바로가기",
				url: "https://www.acmicpc.net"+pathname
			}
		];
	}
	presence.setActivity(presenceData);
});
