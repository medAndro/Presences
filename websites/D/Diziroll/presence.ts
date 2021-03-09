const presence = new Presence({
  clientId: "818550584994168934"
});

let stream: { duration: number; currentTime: number; paused: boolean };
presence.on(
"iFrameData",
(data: { duration: number; currentTime: number; paused: boolean }) =>
  (stream = data)
);

presence.on("UpdateData", async () => {
  const path: string = document.location.pathname,
  presenceData: PresenceData = {largeImageKey: "diziroll"};
  if(path.startsWith("/arsiv")){
  presenceData.details = "Bir sayfaya bakıyor:";
  presenceData.state = "Arşiv";
  presenceData.startTimestamp = Date.now();
  }else if(path.startsWith("/listeler")){
  presenceData.details = "Bir sayfaya bakıyor:";
  presenceData.state = "Listeler";
  presenceData.startTimestamp = Date.now(); 
  }else if(path.startsWith("/hesabim")){
      presenceData.details = "Bir sayfaya bakıyor:";
      presenceData.state = "Hesabım";
      presenceData.startTimestamp = Date.now();    
  }else if(path == "/"){
      presenceData.details = "Bir sayfaya bakıyor:";
      presenceData.state = "Ana Sayfa";
      presenceData.startTimestamp = Date.now();  
  }else if(document.getElementById("archive-page")){
      presenceData.details = "Bir dizi türünü inceliyor: ";
      presenceData.state = document.querySelector("div.title").innerText;
      presenceData.startTimestamp = Date.now();    
  }else if(document.getElementById("series-page")){
      presenceData.details = "Bir diziyi inceliyor:";
      presenceData.state = document.querySelector("div.top > h1").innerText;
      presenceData.startTimestamp = Date.now();  
  }else if(document.getElementsByClassName("episode-detail").length > 0){
      presenceData.details = document.getElementsByClassName("series-name")[0].title || "Bulunamadı";
      presenceData.state = `${document.querySelector("div.select-season > a").innerText ? document.querySelector("div.select-season > a").innerText : "Bulunamadı"}- ${document.querySelector("div.select-episode > a").innerText ? document.querySelector("div.select-episode > a").innerText : "Bulunamadı"}`;
      presenceData.buttons = [
        {label: "İzle", url: document.location.href},
        {label: "Diziyi Görüntüle", url: document.location.origin + "/" +document.location.pathname.split("/")[1]}
      ];
      if (stream.paused == true) {
          presenceData.smallImageKey = "pause";
          presenceData.smallImageText = "Durduruldu";
        } else {
          const timestamps = presence.getTimestamps(stream.currentTime ? Math.floor(stream.currentTime) : null, 
          stream.duration ? Math.floor(stream.duration) : null);
          // Math.floor(stream?.currentTime)
          presenceData.smallImageKey = "play";
          presenceData.smallImageText = "Oynatılıyor";
          presenceData.startTimestamp = timestamps[0];
          presenceData.endTimestamp = timestamps[1];
        }

  }
  presence.setActivity(presenceData);
});