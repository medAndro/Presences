const presence = new Presence({
		clientId: "1197126882597015674",
	}),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused",
	});

presence.on("UpdateData", async () => {
	const { pathname } = document.location,
		presenceData: PresenceData = {
			largeImageKey:
				"https://i.imgur.com/nD4KiGw.png",
		};

	if (pathname === "/") {
		presenceData.smallImageKey = Assets.Search;
		presenceData.smallImageText = "백준(BOJ) 홈페이지 탐색 중입니다.";
		presenceData.details = "백준(BOJ) 홈";
	}
	presence.setActivity(presenceData);
});
