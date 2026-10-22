export interface ProviderApproval {
  provider: string;
  category: string;
  sources: string[];
}

// Every addition beyond the inherited catalog needs a primary-source provider review.
export const providerApprovals: Readonly<Record<string, ProviderApproval>> = {
  "anigamer": {
    "provider": "Bahamut / aniGamer",
    "category": "video-streaming-provider",
    "sources": [
      "https://play.google.com/store/apps/details?id=tw.com.gamer.android.animad"
    ]
  },
  "beeline-tv": {
    "provider": "Beeline TV",
    "category": "telecom-tv-provider",
    "sources": [
      "https://moskva.beeline.ru/customers/products/home/provod/tv/",
      "https://bor.beeline.ru/customers/press/news/details/beeline-tv-pereezzhaet-v-popkorn-beeline/"
    ]
  },
  "cbs": {
    "provider": "CBS / Paramount",
    "category": "official-broadcaster",
    "sources": [
      "https://www.cbs.com/",
      "https://www.cbs.com/tv/roku/"
    ]
  },
  "cnbc": {
    "provider": "CNBC",
    "category": "official-broadcaster",
    "sources": [
      "https://apps.apple.com/us/app/cnbc-stock-market-business/id398018310"
    ]
  },
  "direktesport": {
    "provider": "Direktesport / Amedia",
    "category": "sports-streaming-provider",
    "sources": [
      "https://play.google.com/store/apps/details?id=no.amedia.direktesport"
    ]
  },
  "dnsnettv": {
    "provider": "DNS:NET TV / DNS:NET Internet Service GmbH",
    "category": "telecom-tv-provider",
    "sources": [
      "https://www.dns-net.tv/downloads/manual.pdf",
      "https://play.google.com/store/apps/details?id=de.dnsnet.app.stb.dnsnet.internet"
    ]
  },
  "dreitv": {
    "provider": "Drei TV / Hutchison Drei Austria",
    "category": "telecom-tv-provider",
    "sources": [
      "https://play.google.com/store/apps/details?id=com.drei.tv"
    ]
  },
  "eurosportplayer": {
    "provider": "Eurosport Player / Eurosport (Discovery)",
    "category": "legacy-official-streaming-provider",
    "sources": [
      "https://ir.corporate.discovery.com/news-and-events/financial-news/financial-news-details/2014/Discovery-Communications-Completes-Acquisition-Of-Controlling-Interest-In-Eurosport-International/default.aspx",
      "https://help.eurosport.com/gb/Answer/Detail/000004690"
    ]
  },
  "fizztv": {
    "provider": "Fizz TV",
    "category": "telecom-tv-provider",
    "sources": [
      "https://fizz.ca/en/faq/how-connect-device-view-my-tv-content",
      "https://play.google.com/store/apps/details?id=ca.fizz_app.tv"
    ]
  },
  "free-tv-fr": {
    "provider": "Free TV France / Free",
    "category": "telecom-tv-provider",
    "sources": [
      "https://apps.apple.com/fr/app/free-tv/id1542614107"
    ]
  },
  "freespeechtv": {
    "provider": "Free Speech TV",
    "category": "official-broadcaster",
    "sources": [
      "https://freespeech.org/app/"
    ]
  },
  "frndly-tv": {
    "provider": "Frndly TV",
    "category": "pay-tv-streaming-provider",
    "sources": [
      "https://try.frndlytv.com/",
      "https://www.roku.com/blog/frndly-tv"
    ]
  },
  "hallmark": {
    "provider": "Hallmark+ / Hallmark Media",
    "category": "video-streaming-provider",
    "sources": [
      "https://play.google.com/store/apps/details?id=com.feeln.androidapp"
    ]
  },
  "joyn-at": {
    "provider": "Joyn Austria / ProSiebenSat.1 PULS 4",
    "category": "official-broadcaster-streaming",
    "sources": [
      "https://play.google.com/store/apps/details?id=com.zappntv"
    ]
  },
  "kayo-fire-legacy": {
    "provider": "Kayo Sports / Hubbl Pty Ltd",
    "category": "sports-streaming-provider",
    "sources": [
      "https://play.google.com/store/apps/details?id=au.com.kayosports.tv"
    ]
  },
  "kick": {
    "provider": "KICK",
    "category": "live-video-streaming-provider",
    "sources": [
      "https://play.google.com/store/apps/details?id=com.kick.mobile"
    ]
  },
  "magenta-tv-gen1": {
    "provider": "MagentaTV first generation / Telekom Deutschland",
    "category": "telecom-tv-provider",
    "sources": [
      "https://play.google.com/store/apps/details?id=de.telekom.magentatv.atv",
      "https://apps.apple.com/us/app/magentatv-1-generation/id1054468721"
    ]
  },
  "magic-tv-ocilion": {
    "provider": "kabelplus MAGIC TV / kabelplus GmbH",
    "category": "telecom-tv-provider",
    "sources": [
      "https://play.google.com/store/apps/details?id=com.ocilion.magictv"
    ]
  },
  "maxtv": {
    "provider": "MAXtv / Hrvatski Telekom",
    "category": "telecom-tv-provider",
    "sources": [
      "https://play.google.com/store/apps/details?id=hr.telekom.android.maxtvp"
    ]
  },
  "monumental": {
    "provider": "Monumental+ / Monumental Sports & Entertainment",
    "category": "sports-streaming-provider",
    "sources": [
      "https://apps.apple.com/us/app/monumental/id1082655562"
    ]
  },
  "mtvkatsomo": {
    "provider": "MTV Katsomo / MTV",
    "category": "official-broadcaster-streaming",
    "sources": [
      "https://play.google.com/store/apps/details?id=fi.mtvkatsomo"
    ]
  },
  "o2tv": {
    "provider": "o2 TV Germany / Telefonica Germany",
    "category": "telecom-tv-provider",
    "sources": [
      "https://apps.apple.com/de/app/o2-tv/id6460936474?platform=tv"
    ]
  },
  "oqee-freebox-pop": {
    "provider": "OQEE by Free / Free TV",
    "category": "pay-tv-provider",
    "sources": [
      "https://portail.free.fr/mag-free/nouveautes/mise-a-jour-de-lapplication-oqee-by-free-disponible-sur-le-player-pop/",
      "https://portail.free.fr/mag-free/nouveautes/beneficiez-de-lappli-tv-oqee-by-free-incluse-dans-le-forfait-free-5g/",
      "https://portail.free.fr/mag-free/bons-plans/free-tv-television-gratuite/"
    ]
  },
  "plexpreview": {
    "provider": "Plex",
    "category": "streaming-content-service",
    "sources": [
      "https://forums.plex.tv/t/release-notes-for-new-experience-preview-roku/919361",
      "https://www.plex.tv/watch-free/"
    ]
  },
  "rutube-tv": {
    "provider": "RUTUBE (RUFORM)",
    "category": "streaming-content-service",
    "sources": [
      "https://www.rustore.ru/catalog/app/ru.rutube.app",
      "https://play.google.com/store/apps/details?id=rtb.mobile.android"
    ]
  },
  "ruutu": {
    "provider": "Ruutu (Sanoma Media Finland)",
    "category": "first-party-broadcaster",
    "sources": [
      "https://play.google.com/store/apps/details?id=com.thirdpresence.ruutu&hl=en"
    ]
  },
  "servustvon": {
    "provider": "ServusTV On (Red Bull)",
    "category": "first-party-broadcaster",
    "sources": [
      "https://apps.apple.com/de/app/servustv-on/id517249438"
    ]
  },
  "shudder": {
    "provider": "Shudder (AMC Networks)",
    "category": "streaming-content-service",
    "sources": [
      "https://apps.apple.com/us/app/shudder-horror-thrillers/id919790315"
    ]
  },
  "skych": {
    "provider": "Sky Switzerland",
    "category": "streaming-content-service",
    "sources": [
      "https://play.google.com/store/apps/details?id=homedia.sky.sport&hl=en"
    ]
  },
  "sledovanitv": {
    "provider": "SledovaniTV",
    "category": "pay-tv-provider",
    "sources": [
      "https://play.google.com/store/apps/details?id=cz.sledovanitv.android&hl=en"
    ]
  },
  "soop": {
    "provider": "SOOP",
    "category": "streaming-content-service",
    "sources": [
      "https://play.google.com/store/apps/details?id=kr.co.afreecatv.atv&hl=en"
    ]
  },
  "spectrumnews": {
    "provider": "Spectrum News (Charter Communications)",
    "category": "first-party-broadcaster",
    "sources": [
      "https://corporate.charter.com/newsroom/spectrum-networks-launches-connected-tv-local-news-app-for-roku-and-apple-tv",
      "https://apps.apple.com/tt/app/spectrum-news-local-stories/id740948885?platform=tv"
    ]
  },
  "talksport": {
    "provider": "talkSPORT (News Broadcasting / News UK)",
    "category": "first-party-broadcaster",
    "sources": [
      "https://www.news.co.uk/latest-news/talksport-expands-distribution-to-smart-tv-platforms/"
    ]
  },
  "tcm": {
    "provider": "Turner Classic Movies / Watch TCM",
    "category": "first-party-broadcaster",
    "sources": [
      "https://www.tcm.com/watchtcm",
      "https://www.tcm.com/watchtcm/settings/"
    ]
  },
  "tele2play": {
    "provider": "Tele2 Play",
    "category": "pay-tv-provider",
    "sources": [
      "https://play.google.com/store/apps/details?id=com.tivo.android.comhem&hl=en"
    ]
  },
  "telenorstream": {
    "provider": "Telenor Stream (Telenor Sweden)",
    "category": "pay-tv-provider",
    "sources": [
      "https://play.google.com/store/apps/details?id=se.telenor.stream&hl=en"
    ]
  },
  "tivify": {
    "provider": "Tivify (TVUP Streaming Media)",
    "category": "pay-tv-provider",
    "sources": [
      "https://play.google.com/store/apps/details?id=com.tvup.tivify.app.tv&hl=en"
    ]
  },
  "tod": {
    "provider": "TOD by beIN",
    "category": "streaming-content-service",
    "sources": [
      "https://play.google.com/store/apps/details?id=com.todtv.tod&hl=en"
    ]
  },
  "unsersandmannchen": {
    "provider": "Unser Sandmaennchen (Rundfunk Berlin-Brandenburg)",
    "category": "first-party-broadcaster",
    "sources": [
      "https://www.rbb-online.de/unternehmen/presse/presseinformationen/programm/2017/03/sandmann-gebaerdensprache.html",
      "https://play.google.com/store/apps/details?id=de.rbb.sandmann&hl=en"
    ]
  },
  "victory-plus": {
    "provider": "Victory+ (A Parent Media Co.)",
    "category": "streaming-content-service",
    "sources": [
      "https://play.google.com/store/apps/details?id=tv.apmc.android.victorysports&hl=en"
    ]
  },
  "vidangel": {
    "provider": "VidAngel Entertainment",
    "category": "streaming-content-service",
    "sources": [
      "https://apps.apple.com/us/app/vidangel/id999547807",
      "https://help.vidangel.com/hc/en-us/articles/4413442060557-VidAngel-is-different-than-Angel-Studios"
    ]
  },
  "virgintvgo": {
    "provider": "Virgin TV Go (Virgin Media)",
    "category": "pay-tv-provider",
    "sources": [
      "https://apps.apple.com/gb/app/virgin-tv-go/id1279877804",
      "https://www.virginmedia.com/help/tv/how-to-use-virgin-tv-go-app"
    ]
  },
  "vk-video-tv": {
    "provider": "VK Video (VK LLC)",
    "category": "streaming-content-service",
    "sources": [
      "https://play.google.com/store/apps/details?id=com.vk.tv&hl=en"
    ]
  },
  "vodafone-tv-pt": {
    "provider": "Vodafone TV Portugal",
    "category": "pay-tv-provider",
    "sources": [
      "https://play.google.com/store/apps/details?id=com.vodafone.vtv.atv.pt&hl=en"
    ]
  },
  "wavve": {
    "provider": "Wavve (Content Wavve)",
    "category": "streaming-content-service",
    "sources": [
      "https://play.google.com/store/apps/details?id=kr.co.captv.pooq.tv&hl=en"
    ]
  },
  "wsbtv2": {
    "provider": "WSB-TV Channel 2 (Cox Media Group)",
    "category": "first-party-broadcaster",
    "sources": [
      "https://play.google.com/store/apps/details?id=com.cmgdigital.wsbtvhandset&hl=en"
    ]
  },
  "yleareena": {
    "provider": "Yle Areena (Yleisradio)",
    "category": "first-party-broadcaster",
    "sources": [
      "https://play.google.com/store/apps/details?id=com.yle.webtv&hl=en"
    ]
  },
  "youseeplay": {
    "provider": "YouSee Play (TDC Brands)",
    "category": "pay-tv-provider",
    "sources": [
      "https://apps.apple.com/dk/app/yousee-play/id476306715"
    ]
  },
  "youtv": {
    "provider": "YouTV Germany (NETlantic GmbH)",
    "category": "streaming-content-service",
    "sources": [
      "https://help.youtv.de/hc/de/articles/360029110951-German-TV-worldwide",
      "https://help.youtv.de/hc/de/articles/360029117311-YouTV-NETlantic-GmbH",
      "https://www.youtv.de/"
    ]
  },
  "zapping": {
    "provider": "Zapping TV",
    "category": "pay-tv-provider",
    "sources": [
      "https://play.google.com/store/apps/details?id=com.eltelon.zapping&hl=en"
    ]
  },
  "zitotv2go": {
    "provider": "ZitoTV2Go (Zito Media)",
    "category": "pay-tv-provider",
    "sources": [
      "https://www.zitomedia.net/wp-content/uploads/2020/09/ZitoTV2Go-Installation-Instructions-6.pdf",
      "https://play.google.com/store/apps/details?id=com.zitotv2go&hl=en",
      "https://apps.apple.com/us/app/zitotv2go/id1300487121"
    ]
  }
};

// Stable inherited IDs remain usable in explicit YAML; these are not provider recommendations.
export const legacyUtilities: Readonly<Record<string, {reason: string; source: string}>> = {
  'nordvpn': {reason:'VPN utility',source:'https://nordvpn.com/'},
  'private-internet-access': {reason:'VPN utility',source:'https://www.privateinternetaccess.com/'},
  'surfshark-vpn': {reason:'VPN utility',source:'https://surfshark.com/'},
  'windscribe-vpn': {reason:'VPN utility',source:'https://windscribe.com/'},
  'wireguard': {reason:'VPN utility',source:'https://www.wireguard.com/'},
};
