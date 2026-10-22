// Reviewed app-request evidence. Package launches deliberately avoid inferred foreground activities.
import type { CatalogPatch } from "./types";

export const catalogPatches: CatalogPatch[] = [
  {
    "id": "tinycam-monitor-pro",
    "aliases": [],
    "issues": [
      248
    ],
    "platforms": {
      "amazon-fire": {
        "appName": "com.alexvas.dvr.pro",
        "androidName": "com.alexvas.dvr.pro",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/248"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/248",
      "https://play.google.com/store/apps/details?id=com.alexvas.dvr.pro"
    ],
    "notes": [
      "Closed stale for missing metadata; later #529 implemented tinycam-monitor-pro only for NVIDIA Shield/onn. Original Amazon Fire part remains unsupported in catalog; no proven Fire launch."
    ],
    "observedEvidence": []
  },
  {
    "id": "stbemupro",
    "aliases": [],
    "issues": [
      302
    ],
    "platforms": {
      "nvidia-shield": {
        "appName": "com.mvas.stb.emu.pro",
        "androidName": "com.mvas.stb.emu.pro",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/302"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/302",
      "https://play.google.com/store/apps/details?id=com.mvas.stb.emu.pro"
    ],
    "notes": [
      "StbEmu Pro package com.mvas.stb.emu.pro from store, no working launch; closed pending requester response. No local preset despite artwork completed."
    ],
    "displayName": "StbEmu Pro",
    "observedEvidence": []
  },
  {
    "id": "now-tv",
    "aliases": [],
    "issues": [
      386,
      559,
      782
    ],
    "platforms": {
      "amazon-fire": {
        "appName": "com.bskyb.nowtv.beta",
        "androidName": "com.bskyb.nowtv.beta",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/559"
          }
        ]
      },
      "chromecast": {
        "appName": "com.bskyb.nowtv.beta",
        "androidName": "com.bskyb.nowtv.beta",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/782"
          }
        ]
      },
      "nvidia-shield": {
        "appName": "com.bskyb.nowtv.beta",
        "androidName": "com.bskyb.nowtv.beta",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/386"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/782"
          },
          {
            "kind": "official-supported-devices",
            "url": "https://www.nowtv.com/help/article/what-set-top-boxes-streaming-devices-can-i-use-to-watch"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/386",
      "https://github.com/PRProd/HA-Firemote/issues/559",
      "https://github.com/PRProd/HA-Firemote/issues/782",
      "https://www.nowtv.com/help/article/what-set-top-boxes-streaming-devices-can-i-use-to-watch"
    ],
    "notes": [
      "NOW UK request for Shield closed requesting proper request form. now-tv still supports only Fire/Apple/Roku; no verified Shield launch.",
      "NOW and Discovery+ Fire Stick Lite launch failures; existing presets, no new verified working identifier in this thread. Keep UK NOW, NOW Italy and Discovery+ alt separate.",
      "Comment 6111285689 reports working BBC bbc.iplayer.android/external.androidtv.psbwrapper.deeplinking.DeepLinkActivity replacing bbciplayer path, and NOW com.bskyb.nowtv.beta/com.peacock.peacocktv.GoogleMainActivity (v7.10.200). NOW has no Chromecast family. Discovery+ URL https://play.discoveryplus.com/ is only suggested, not confirmed as working app deep link."
    ],
    "region": "GB",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "com.nowtv.it/sky.wrapper.tv.AmazonMainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/559#issuecomment-2525552201",
        "issue": 559
      },
      {
        "kind": "observed_component",
        "value": "com.discovery.discoplus/com.discovery.luna.tv.presentation.LunaMainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/559#issuecomment-2525552201",
        "issue": 559
      },
      {
        "kind": "observed_component",
        "value": "com.discovery.discoplus/com.discovery.luna.tv.presentation.LunaMainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/559#issuecomment-2558142993",
        "issue": 559
      },
      {
        "kind": "observed_component",
        "value": "bbc.iplayer.android/external.androidtv.bbciplayer.deeplinking.DeepLinkActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/782#issuecomment-6111285689",
        "issue": 782
      },
      {
        "kind": "observed_component",
        "value": "bbc.iplayer.android/external.androidtv.psbwrapper.deeplinking.DeepLinkActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/782#issuecomment-6111285689",
        "issue": 782
      },
      {
        "kind": "observed_component",
        "value": "com.bskyb.nowtv.beta/com.peacock.peacocktv.GoogleMainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/782#issuecomment-6111285689",
        "issue": 782
      }
    ]
  },
  {
    "id": "eurosportplayer",
    "aliases": [],
    "issues": [
      391
    ],
    "platforms": {
      "chromecast": {
        "appName": "com.eurosport.player",
        "androidName": "com.eurosport.player",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/391"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/391",
      "https://help.eurosport.com/gb/Answer/Detail/000004679"
    ],
    "notes": [
      "Eurosport Player was shipped and requester confirmed com.eurosport.player/.MainActivity; no matching preset/package remains anywhere in current launcherData. Historical implementation is not current coverage; verify service availability before restoring.",
      "Historical request restored as a legacy package choice only. Present-day service availability and region remain unverified; do not substitute another service automatically."
    ],
    "displayName": "Eurosport Player (legacy)",
    "lifecycle": "legacy",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "com.eurosport.player/com.eurosport.player.MainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.netflix.ninja/com.amazon.identity.auth.device.workflow.WorkflowActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.netflix.ninja/.MainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.netflix.ninja/o.consumeDisplayCutout$M135Cu0D",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.netflix.ninja/.DebugBroadcastReceiver",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.netflix.ninja/.CapabilityRequestReceiver",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.netflix.ninja/o.consumeDisplayCutout$M0s8NeYn",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.netflix.ninja/.NetflixKeyReceiver",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.netflix.ninja/androidx.profileinstaller.ProfileInstallReceiver",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.netflix.ninja/o.consumeDisplayCutout$M$oMD214",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.netflix.ninja/o.consumeDisplayCutout$M1cMYXGO",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.netflix.ninja/com.netflix.mediaclient.pushnotification.ADMMessageReceiver",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.netflix.ninja/.InitializeProgramsReceiver",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.netflix.ninja/.DETBroadcastReceiver",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.netflix.ninja/.EsnInquiryReceiver",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.netflix.ninja/com.google.firebase.iid.FirebaseInstanceIdReceiver",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.netflix.ninja/o.copyWindowDataInto",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.netflix.ninja/.BootCompleteReceiver",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.netflix.ninja/.SNDBroadcastReceiver",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.netflix.ninja/.DialStopReceiver",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.netflix.ninja/androidx.work.impl.diagnostics.DiagnosticsReceiver",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.netflix.ninja/androidx.work.impl.background.systemalarm.ConstraintProxyUpdateReceiver",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.netflix.ninja/.PreAppInitTilesReceiver",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.netflix.ninja/.NetflixService",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.netflix.ninja/com.firebase.jobdispatcher.GooglePlayReceiver",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.netflix.ninja/o.onSetRowStatus",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.netflix.ninja/com.google.firebase.messaging.FirebaseMessagingService",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.netflix.ninja/o.setVerticalGridViewLayout",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.netflix.ninja/10100",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.netflix.ninja/com.google.firebase.provider.FirebaseInitProvider",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.netflix.ninja/com.netflix.mediaclient.preapp.PreAppRecoBuilder$PreAppRecoContentProvider",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.netflix.ninja/o.setIconified",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.netflix.ninja/androidx.work.impl.utils.ForceStopRunnable$BroadcastReceiver",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.amazon.tv.launcher/u0a41",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.amazon.tv.launcher/.ui.HomeActivity_vNext",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.amazon.tv.inputpreference.service/com.amazon.tv.inputpreference.player.PassthroughPlayerActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.amazon.tv.inputpreference.service/com.amazon.tv.inputpreference.inputtab.InputTabActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.amazon.firetv.youtube/dev.cobalt.app.MainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.amazon.firetv.youtube/u0a202",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.amazon.ceviche/.boot.completed.BootCompletedService",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "amazon.fireos/com.amazon.UsageStats.AmazonUsageStatsScheduler",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "amazon.fireos/com.fireos.dws.FavoriteAppsMetricsRecorderJobService",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.amazon.device.messaging/.LifecycleEventService",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.amazon.ceviche/.boot.completed.BootCompletedJobService",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.amazon.neodelegate/.jobscheduling.WorkSchedulingJobService",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "amazon.fireos/com.amazon.protometrics.AmazonProtometricsScheduler",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "amazon.fireos/com.amazon.amazonemmcconsumer.AmazonEmmcConsumerScheduler",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "amazon.fireos/com.amazon.arcus.ArcusJobScheduler",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.amazon.device.crashmanager/.CrashJobService",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.amazon.tv.alexaalerts/.timedevents.notifications.NotificationReloaderService",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.amazon.device.messaging/.EspressoShotBootService",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.amazon.device.sale.service/com.amazon.device.sale.api.SessionScheduler",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "amazon.fireos/com.amazon.android.settings.amazondropbox.LogRetentionJobService",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.netflix.ninja/.alwaysfresh.AlwaysFreshNewJobService",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.netflix.ninja/androidx.work.impl.background.systemjob.SystemJobService",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.netflix.ninja/.PreAppRecoRefreshJobService",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.netflix.ninja/com.netflix.mediaclient.pushnotification.ADMMessageJobHandler",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096315079",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.eurosport.player/.ui.activities.MainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.eurosport.player/com.eurosport.player.ui.activities.MainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.eurosport.player/.MainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.eurosport.player/androidx.startup.InitializationProvider",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.google.android.apps.tv.launcherx/u0a43",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.eurosport.player/u0a78",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.android.localtransport/1000",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.android.tv.settings/1000",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.google.android.chromecast.chromecastservice/1000",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.android.bluetooth/1002",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.android.providers.tv/u0a8",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "android.process.media/u0a11",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.android.providers.calendar/u0a13",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.android.statementservice/u0a14",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "android.process.acore/u0a15",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.android.externalstorage/u0a18",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.google.android.ext.services/u0a19",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.google.android.permissioncontroller/u0a21",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.google.android.partnersetup/u0a35",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.google.android.tungsten.setupwraith/u0a37",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.google.android.gms/u0a40",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.google.android.gms.persistent/u0a40",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.google.android.gms.unstable/u0a40",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.google.process.gapps/u0a40",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.google.process.gservices/u0a40",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.google.android.tv.dfuservice/u0a41",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.google.android.apps.mediashell/u0a44",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.google.android.apps.tv.dreamx/u0a45",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.google.android.tv.remote.service/u0a48",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.android.vending/u0a50",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.google.android.tv.axel/u0a51",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.google.android.tts/u0a52",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.google.android.play.games/u0a56",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.google.android.syncadapters.calendar/u0a60",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.droidlogic/u0a61",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.google.android.videos/u0a62",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.netflix.ninja/u0a64",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.google.android.youtube.tv/u0a65",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.google.android.youtube.tv.recommendations/u0a65",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.amazon.amazonvideo.livingroom/u0a67",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.apple.atve.androidtv.appletv/u0a68",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.viaplay.android/u0a70",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.hbo.hbonow/u0a74",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.google.android.apps.education.cast2class/u0a93",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.android.providers.media.module/u0a99",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.android.keychain/1000",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.formulaone.production/u0a75",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.google.android.tv.remotecontrol.logging/u0a33",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.android.networkstack.inprocess/com.android.server.connectivity.ipmemorystore.RegularMaintenanceJobService",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.android.providers.settings/.WriteFallbackSettingsFilesJobService",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096352143",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.eurosport.player/.ui.activities.MainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096451823",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.eurosport.player/com.eurosport.player.MainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096451823",
        "issue": 391
      },
      {
        "kind": "observed_component",
        "value": "com.eurosport.player/.MainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/391#issuecomment-2096451823",
        "issue": 391
      }
    ]
  },
  {
    "id": "direktesport",
    "aliases": [],
    "issues": [
      451
    ],
    "platforms": {
      "chromecast": {
        "appName": "no.amedia.direktesport",
        "androidName": "no.amedia.direktesport",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/451"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/451",
      "https://play.google.com/store/apps/details?id=no.amedia.direktesport&hl=no&pli=1"
    ],
    "notes": [
      "Direktesport on Philips Android TV; denied unsupported device, no local preset."
    ],
    "displayName": "Direktesport",
    "observedEvidence": [
      {
        "kind": "app_id",
        "value": "no.amedia.direktesport",
        "source": "https://github.com/PRProd/HA-Firemote/issues/451",
        "issue": 451
      },
      {
        "kind": "app_name",
        "value": "no.amedia.direktesport",
        "source": "https://github.com/PRProd/HA-Firemote/issues/451",
        "issue": 451
      },
      {
        "kind": "source",
        "value": "no.amedia.direktesport",
        "source": "https://github.com/PRProd/HA-Firemote/issues/451",
        "issue": 451
      }
    ]
  },
  {
    "id": "tv2-play-norway",
    "aliases": [],
    "issues": [
      452
    ],
    "platforms": {
      "chromecast": {
        "appName": "no.tv2.sumo",
        "androidName": "no.tv2.sumo",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/452"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/452",
      "https://play.google.com/store/apps/details?id=no.tv2.sumo&hl=no"
    ],
    "notes": [
      "Norwegian TV2 Play no.tv2.sumo on Philips configured as Chromecast was denied unsupported hardware. tv2-play-norway exists only for Apple TV; Danish tv2-play is a different product."
    ],
    "region": "NO",
    "observedEvidence": [
      {
        "kind": "app_id",
        "value": "no.tv2.sumo}",
        "source": "https://github.com/PRProd/HA-Firemote/issues/452",
        "issue": 452
      },
      {
        "kind": "app_name",
        "value": "no.tv2.sumo}",
        "source": "https://github.com/PRProd/HA-Firemote/issues/452",
        "issue": 452
      },
      {
        "kind": "source",
        "value": "no.tv2.sumo}",
        "source": "https://github.com/PRProd/HA-Firemote/issues/452",
        "issue": 452
      }
    ]
  },
  {
    "id": "skych",
    "aliases": [],
    "issues": [
      608
    ],
    "platforms": {
      "chromecast": {
        "appName": "homedia.sky.sport",
        "androidName": "homedia.sky.sport",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/608"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/608",
      "https://play.google.com/store/apps/details?id=homedia.sky.sport&hl=de"
    ],
    "notes": [
      "Swiss Sky CH package homedia.sky.sport and observed TvActivity supplied. Maintainer could not run available APK on Chromecast; requester later cannot connect ADB after Android 14. Missing preset plus integration/architecture test gate; not a proven working launch."
    ],
    "displayName": "Sky CH",
    "region": "CH",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "homedia.sky.sport/com.sky.app.activities.TvActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/608",
        "issue": 608
      }
    ]
  },
  {
    "id": "telenorstream",
    "aliases": [],
    "issues": [
      614
    ],
    "platforms": {
      "chromecast": {
        "appName": "se.telenor.stream",
        "androidName": "se.telenor.stream",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/614"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/614",
      "https://play.google.com/store/apps/details?id=se.telenor.stream&hl=sv&pli=1"
    ],
    "notes": [
      "No matching native preset in local catalog. Add this app/variant only after validating supplied package/source/channel evidence on the requested platform; never derive an activity from a foreground surface alone."
    ],
    "displayName": "Telenor Stream",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "se.telenor.stream/se.telenor.stream.MainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/614",
        "issue": 614
      }
    ]
  },
  {
    "id": "servustvon",
    "aliases": [],
    "issues": [
      616
    ],
    "platforms": {
      "apple-tv": {
        "appName": "ServusTV On",
        "launchStrategy": "source",
        "sourceAliases": [],
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/616"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/616",
      "https://apps.apple.com/de/app/servustv-on/id517249438"
    ],
    "notes": [
      "No matching native preset in local catalog. Add this app/variant only after validating supplied package/source/channel evidence on the requested platform; never derive an activity from a foreground surface alone."
    ],
    "displayName": "ServusTV ON",
    "observedEvidence": []
  },
  {
    "id": "magic-tv-ocilion",
    "aliases": [],
    "issues": [
      619,
      840
    ],
    "platforms": {
      "amazon-fire": {
        "appName": "com.ocilion.magictv",
        "androidName": "com.ocilion.magictv",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/840"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/619",
      "https://www.amazon.de/kabelplus-GmbH-MAGIC-TV/dp/B07PCJDDRV",
      "https://github.com/PRProd/HA-Firemote/issues/840"
    ],
    "notes": [
      "No matching native preset in local catalog. Add this app/variant only after validating supplied package/source/channel evidence on the requested platform; never derive an activity from a foreground surface alone.",
      "Package com.ocilion.magictv is reported verified, but author explicitly fabricated the example focus/activity based on 'standard build'. #619 supplies different observed com.ocilion.tvfellow.MainActivity; do not treat #840's com.ocilion.magictv.MainActivity as verified."
    ],
    "displayName": "Magic TV",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "com.ocilion.magictv/com.ocilion.tvfellow.MainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/619",
        "issue": 619
      },
      {
        "kind": "observed_component",
        "value": "com.ocilion.magictv/com.ocilion.magictv.MainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/840",
        "issue": 840
      }
    ]
  },
  {
    "id": "plexpreview",
    "aliases": [],
    "issues": [
      623
    ],
    "platforms": {
      "roku": {
        "appName": "Plex Preview",
        "launchStrategy": "source",
        "sourceAliases": [],
        "app-id": 55188,
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/623"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/623"
    ],
    "notes": [
      "No matching native preset in local catalog. Add this app/variant only after validating supplied package/source/channel evidence on the requested platform; never derive an activity from a foreground surface alone."
    ],
    "displayName": "Plex Preview",
    "observedEvidence": [
      {
        "kind": "app_id",
        "value": "55188",
        "source": "https://github.com/PRProd/HA-Firemote/issues/623",
        "issue": 623
      },
      {
        "kind": "app_name",
        "value": "Plex Preview",
        "source": "https://github.com/PRProd/HA-Firemote/issues/623",
        "issue": 623
      },
      {
        "kind": "source",
        "value": "Plex Preview",
        "source": "https://github.com/PRProd/HA-Firemote/issues/623",
        "issue": 623
      }
    ]
  },
  {
    "id": "tv-vlaanderen",
    "aliases": [],
    "issues": [
      625
    ],
    "platforms": {
      "amazon-fire": {
        "appName": "nl.streamgroup.vlaanderen",
        "androidName": "nl.streamgroup.vlaanderen",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/625"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/625",
      "https://www.amazon.com/Canal-M7-Luxembourg-TV-VLAANDEREN/dp/B0BZDRY199/ref=sr_1_1?s=mobile-apps&sr=1-1"
    ],
    "notes": [
      "tv-vlaanderen exists on other families, but Amazon Fire is absent. Requested nl.streamgroup.vlaanderen/tv.solocoo.htmlapp.FullscreenActivity. Add Fire variant after device validation."
    ],
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "nl.streamgroup.vlaanderen/tv.solocoo.htmlapp.FullscreenActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/625",
        "issue": 625
      }
    ]
  },
  {
    "id": "tivify",
    "aliases": [],
    "issues": [
      626,
      627
    ],
    "platforms": {
      "amazon-fire": {
        "appName": "com.tvup.tivify.app.tv",
        "androidName": "com.tvup.tivify.app.tv",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/627"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/626",
      "https://play.google.com/store/apps/details?id=com.tvup.tivify.app.tv",
      "https://github.com/PRProd/HA-Firemote/issues/627"
    ],
    "notes": [
      "Closed no-comment duplicate body of open #627 Tivify; no local preset. Closed state is not implementation evidence.",
      "No matching native preset in local catalog. Add this app/variant only after validating supplied package/source/channel evidence on the requested platform; never derive an activity from a foreground surface alone."
    ],
    "displayName": "Tivify",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "com.tvup.tivify.app.tv/com.tvup.tvapp.view.home.HomeActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/626",
        "issue": 626
      },
      {
        "kind": "observed_component",
        "value": "com.tvup.tivify.app.tv/com.tvup.tvapp.view.home.HomeActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/627",
        "issue": 627
      }
    ]
  },
  {
    "id": "kick",
    "aliases": [],
    "issues": [
      628
    ],
    "platforms": {
      "chromecast": {
        "appName": "com.kick.mobile",
        "androidName": "com.kick.mobile",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/628"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/628",
      "https://play.google.com/store/apps/details?id=com.kick.mobile"
    ],
    "notes": [
      "No matching native preset in local catalog. Add this app/variant only after validating supplied package/source/channel evidence on the requested platform; never derive an activity from a foreground surface alone."
    ],
    "displayName": "Kick",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "com.kick.mobile/com.kick.mobile.app.MainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/628",
        "issue": 628
      }
    ]
  },
  {
    "id": "mtvkatsomo",
    "aliases": [],
    "issues": [
      629
    ],
    "platforms": {
      "chromecast": {
        "appName": "fi.mtvkatsomo",
        "androidName": "fi.mtvkatsomo",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/629"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/629",
      "https://play.google.com/store/apps/details?id=fi.mtvkatsomo&hl=fi"
    ],
    "notes": [
      "No matching native preset in local catalog. Add this app/variant only after validating supplied package/source/channel evidence on the requested platform; never derive an activity from a foreground surface alone."
    ],
    "displayName": "MTV Katsomo",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "fi.mtvkatsomo/se.tv4.tv4play.ui.tv.navigation.TvHubActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/629",
        "issue": 629
      }
    ]
  },
  {
    "id": "ruutu",
    "aliases": [],
    "issues": [
      630
    ],
    "platforms": {
      "chromecast": {
        "appName": "com.thirdpresence.ruutu",
        "androidName": "com.thirdpresence.ruutu",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/630"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/630",
      "https://play.google.com/store/apps/details?id=com.thirdpresence.ruutu&hl=fi"
    ],
    "notes": [
      "No matching native preset in local catalog. Add this app/variant only after validating supplied package/source/channel evidence on the requested platform; never derive an activity from a foreground surface alone."
    ],
    "displayName": "Ruutu",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "com.thirdpresence.ruutu/com.sofiadigital.ruutu.MainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/630",
        "issue": 630
      }
    ]
  },
  {
    "id": "yleareena",
    "aliases": [],
    "issues": [
      631
    ],
    "platforms": {
      "chromecast": {
        "appName": "com.yle.webtv",
        "androidName": "com.yle.webtv",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/631"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/631",
      "https://play.google.com/store/apps/details?id=com.yle.webtv&hl=fi"
    ],
    "notes": [
      "No matching native preset in local catalog. Add this app/variant only after validating supplied package/source/channel evidence on the requested platform; never derive an activity from a foreground surface alone."
    ],
    "displayName": "Yle Areena",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "com.yle.webtv/fi.yle.areena.leanback.activity.LeanbackSplashActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/631",
        "issue": 631
      }
    ]
  },
  {
    "id": "sky-showtime",
    "aliases": [],
    "issues": [
      632
    ],
    "platforms": {
      "chromecast": {
        "appName": "com.skyshowtime.skyshowtime.google",
        "androidName": "com.skyshowtime.skyshowtime.google",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/632"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/632",
      "https://play.google.com/store/apps/details?id=com.skyshowtime.skyshowtime.google"
    ],
    "notes": [
      "sky-showtime omits Chromecast. Same package/component already exists for Fire, Homatics and Shield; enable Chromecast only after testing the supplied GoogleMainActivity there."
    ],
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "com.skyshowtime.skyshowtime.google/com.peacock.peacocktv.GoogleMainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/632",
        "issue": 632
      }
    ]
  },
  {
    "id": "spectrumnews",
    "aliases": [],
    "issues": [
      633
    ],
    "platforms": {
      "apple-tv": {
        "appName": "Spectrum News",
        "launchStrategy": "source",
        "sourceAliases": [],
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/633"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/633"
    ],
    "notes": [
      "No matching native preset in local catalog. Add this app/variant only after validating supplied package/source/channel evidence on the requested platform; never derive an activity from a foreground surface alone."
    ],
    "displayName": "Spectrum News",
    "observedEvidence": [
      {
        "kind": "app_id",
        "value": "com.twcable.twcnews",
        "source": "https://github.com/PRProd/HA-Firemote/issues/633",
        "issue": 633
      },
      {
        "kind": "app_name",
        "value": "Spectrum News",
        "source": "https://github.com/PRProd/HA-Firemote/issues/633",
        "issue": 633
      }
    ]
  },
  {
    "id": "wsbtv2",
    "aliases": [],
    "issues": [
      636
    ],
    "platforms": {
      "nvidia-shield": {
        "appName": "com.cmgdigital.wsbtvhandset",
        "androidName": "com.cmgdigital.wsbtvhandset",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/636"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/636"
    ],
    "notes": [
      "No matching native preset in local catalog. Add this app/variant only after validating supplied package/source/channel evidence on the requested platform; never derive an activity from a foreground surface alone."
    ],
    "displayName": "WSBTV2",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "com.cmgdigital.wsbtvhandset/com.cmg.googletv.activities.MainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/636",
        "issue": 636
      }
    ]
  },
  {
    "id": "surfshark-vpn",
    "aliases": [],
    "issues": [
      640
    ],
    "platforms": {
      "apple-tv": {
        "appName": "Surfshark",
        "launchStrategy": "source",
        "sourceAliases": [],
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/640"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/640",
      "https://apps.apple.com/gb/app/surfshark-vpn-fast-reliable/id1391782046?platform=appleTV"
    ],
    "notes": [
      "surfshark-vpn is Android-only; add Apple TV source Surfshark from the supplied list. Do not reuse the Android package on tvOS."
    ],
    "observedEvidence": []
  },
  {
    "id": "dreamplayer",
    "aliases": [],
    "issues": [
      646
    ],
    "platforms": {
      "amazon-fire": {
        "appName": "de.cyberdream.dreamepg.tv.player",
        "androidName": "de.cyberdream.dreamepg.tv.player",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/646"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/646",
      "https://www.amazon.de/-/en/dp/B0193XIPSS"
    ],
    "notes": [
      "No matching native preset in local catalog. Add this app/variant only after validating supplied package/source/channel evidence on the requested platform; never derive an activity from a foreground surface alone."
    ],
    "displayName": "dream Player",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "de.cyberdream.dreamepg.tv.player/de.cyberdream.dreamepg.MainActivityTV",
        "source": "https://github.com/PRProd/HA-Firemote/issues/646",
        "issue": 646
      }
    ]
  },
  {
    "id": "virgintvgo",
    "aliases": [],
    "issues": [
      648
    ],
    "platforms": {
      "apple-tv": {
        "appName": "Virgin TV Go",
        "launchStrategy": "source",
        "sourceAliases": [],
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/648"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/648"
    ],
    "notes": [
      "No matching native preset in local catalog. Add this app/variant only after validating supplied package/source/channel evidence on the requested platform; never derive an activity from a foreground surface alone."
    ],
    "displayName": "Virgin TV Go",
    "observedEvidence": []
  },
  {
    "id": "ip-cam-viewer-paid",
    "aliases": [],
    "issues": [
      653,
      694
    ],
    "platforms": {
      "amazon-fire": {
        "appName": "com.rcreations.WebCamViewerPaid",
        "androidName": "com.rcreations.WebCamViewerPaid",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/694"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/653",
      "https://github.com/PRProd/HA-Firemote/issues/694"
    ],
    "notes": [
      "Original body accidentally contains DAKboard's Amazon web wrapper. Requester corrects this in comment 2715455425 to com.rcreations.WebCamViewerPaid/com.rcreations.WebCamViewerPaid.MatrixViewActivity. This is the PAID variant, separate from ip-cam-viewer-free; group with #694.",
      "Paid IPCam is com.rcreations.WebCamViewerPaid; same corrected identity as #653. Keep separate from Free app and DAKboard."
    ],
    "displayName": "IP Cam Viewer (Paid)",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "com.amazon.rialto.cordova.webapp.webapp9dec859387ba4ceeba2909ab173a82e5/com.amazon.rialto.cordova.webapp.webapp9dec859387ba4ceeba2909ab173a82e5.MainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/653",
        "issue": 653
      },
      {
        "kind": "observed_component",
        "value": "com.rcreations.WebCamViewerPaid/com.rcreations.WebCamViewerPaid.MatrixViewActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/653#issuecomment-2715455425",
        "issue": 653
      },
      {
        "kind": "app_id",
        "value": "com.rcreations.WebCamViewerPaid",
        "source": "https://github.com/PRProd/HA-Firemote/issues/653#issuecomment-2715455425",
        "issue": 653
      },
      {
        "kind": "app_name",
        "value": "com.rcreations.WebCamViewerPaid",
        "source": "https://github.com/PRProd/HA-Firemote/issues/653#issuecomment-2715455425",
        "issue": 653
      },
      {
        "kind": "source",
        "value": "com.rcreations.WebCamViewerPaid",
        "source": "https://github.com/PRProd/HA-Firemote/issues/653#issuecomment-2715455425",
        "issue": 653
      },
      {
        "kind": "observed_component",
        "value": "com.rcreations.WebCamViewerPaid/com.rcreations.WebCamViewerPaid.MatrixViewActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/694",
        "issue": 694
      }
    ]
  },
  {
    "id": "frndly-tv",
    "aliases": [],
    "issues": [
      655,
      860
    ],
    "platforms": {
      "roku": {
        "appName": "Frndly TV",
        "launchStrategy": "source",
        "sourceAliases": [],
        "app-id": 298229,
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/860"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/655",
      "https://channelstore.roku.com/details/8a5b37780b549735a1483fc693e218c8:826e3c1a95a43d946fc157679d59f32d/frndly-tv",
      "https://github.com/PRProd/HA-Firemote/issues/860"
    ],
    "notes": [
      "No matching native preset in local catalog. Add this app/variant only after validating supplied package/source/channel evidence on the requested platform; never derive an activity from a foreground surface alone.",
      "Exact duplicate of #655: Frndly TV Roku channel 298229/source Frndly TV; one catalog addition."
    ],
    "displayName": "Frndly TV",
    "observedEvidence": [
      {
        "kind": "app_id",
        "value": "298229",
        "source": "https://github.com/PRProd/HA-Firemote/issues/655",
        "issue": 655
      },
      {
        "kind": "app_name",
        "value": "Frndly TV",
        "source": "https://github.com/PRProd/HA-Firemote/issues/655",
        "issue": 655
      },
      {
        "kind": "source",
        "value": "Frndly TV",
        "source": "https://github.com/PRProd/HA-Firemote/issues/655",
        "issue": 655
      },
      {
        "kind": "app_id",
        "value": "298229",
        "source": "https://github.com/PRProd/HA-Firemote/issues/860",
        "issue": 860
      },
      {
        "kind": "app_name",
        "value": "Frndly TV",
        "source": "https://github.com/PRProd/HA-Firemote/issues/860",
        "issue": 860
      },
      {
        "kind": "source",
        "value": "Frndly TV",
        "source": "https://github.com/PRProd/HA-Firemote/issues/860",
        "issue": 860
      }
    ]
  },
  {
    "id": "youseeplay",
    "aliases": [],
    "issues": [
      659
    ],
    "platforms": {
      "apple-tv": {
        "appName": "YouSee Play",
        "launchStrategy": "source",
        "sourceAliases": [],
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/659"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/659",
      "https://apps.apple.com/dk/app/yousee-play/id476306715?l=da"
    ],
    "notes": [
      "No matching native preset in local catalog. Add this app/variant only after validating supplied package/source/channel evidence on the requested platform; never derive an activity from a foreground surface alone."
    ],
    "displayName": "YouSee Play",
    "observedEvidence": []
  },
  {
    "id": "nozomi",
    "aliases": [],
    "issues": [
      661
    ],
    "platforms": {
      "nvidia-shield": {
        "appName": "com.nozomi",
        "androidName": "com.nozomi",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/661"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/661"
    ],
    "notes": [
      "No matching native preset in local catalog. Add this app/variant only after validating supplied package/source/channel evidence on the requested platform; never derive an activity from a foreground surface alone."
    ],
    "displayName": "Nozomi",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "com.nozomi/com.nozomi.MainUI",
        "source": "https://github.com/PRProd/HA-Firemote/issues/661",
        "issue": 661
      }
    ]
  },
  {
    "id": "ikortv",
    "aliases": [],
    "issues": [
      662
    ],
    "platforms": {
      "nvidia-shield": {
        "appName": "com.iptv2.ikortv",
        "androidName": "com.iptv2.ikortv",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/662"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/662"
    ],
    "notes": [
      "No matching native preset in local catalog. Add this app/variant only after validating supplied package/source/channel evidence on the requested platform; never derive an activity from a foreground surface alone."
    ],
    "displayName": "iKorTV",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "com.iptv2.ikortv/com.iptv2.activity.LaunchMutiActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/662",
        "issue": 662
      }
    ]
  },
  {
    "id": "odido",
    "aliases": [],
    "issues": [
      663,
      776
    ],
    "platforms": {
      "chromecast": {
        "appName": "com.tmobile.tv.nl",
        "androidName": "com.tmobile.tv.nl",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/663"
          }
        ]
      },
      "amazon-fire": {
        "appName": "com.tmobile.tv.nl",
        "androidName": "com.tmobile.tv.nl",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/776"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/663",
      "https://play.google.com/store/apps/details?id=nl.oberon.tmobile.my",
      "https://github.com/PRProd/HA-Firemote/issues/776"
    ],
    "notes": [
      "Chromecast missing from odido. Store URL says nl.oberon.tmobile.my while optional comment says com.tmobile.tv.nl; do not substitute mobile and TV identifiers. #776 supplies a Fire TV build, not proof of Chromecast launch.",
      "odido has tvOS only. Fire request supplies com.tmobile.tv.nl/com.zodiac.tv.presentation.common.layouts.ZodiacActivity; TV variant differs from #663 linked mobile package. Device-test before enabling Fire."
    ],
    "region": "NL",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "com.tmobile.tv.nl/com.zodiac.tv.presentation.common.layouts.ZodiacActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/776",
        "issue": 776
      }
    ]
  },
  {
    "id": "tunein",
    "aliases": [],
    "issues": [
      664
    ],
    "platforms": {
      "chromecast": {
        "appName": "tunein.player",
        "androidName": "tunein.player",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/664"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/664",
      "https://play.google.com/store/apps/details?id=tunein.player"
    ],
    "notes": [
      "No matching native preset in local catalog. Add this app/variant only after validating supplied package/source/channel evidence on the requested platform; never derive an activity from a foreground surface alone."
    ],
    "displayName": "TuneIn",
    "observedEvidence": []
  },
  {
    "id": "immich-tv",
    "aliases": [
      "immich"
    ],
    "issues": [
      666
    ],
    "platforms": {
      "amazon-fire": {
        "appName": "nl.giejay.android.tv.immich",
        "androidName": "nl.giejay.android.tv.immich",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/666"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/666",
      "https://play.google.com/store/apps/details?id=app.alextran.immich"
    ],
    "notes": [
      "Body reports nl.giejay.android.tv.immich (Android TV client), while linked store app is app.alextran.immich. Use the installed TV client's observed MainActivity after validating launch, not the mobile app package; separate from Apple TV ImmichFrame #674."
    ],
    "displayName": "Immich (Android TV client)",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "nl.giejay.android.tv.immich/nl.giejay.android.tv.immich.MainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/666",
        "issue": 666
      },
      {
        "kind": "observed_component",
        "value": "nl.giejay.android.tv.immich/.MainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/666",
        "issue": 666
      }
    ]
  },
  {
    "id": "immichframe",
    "aliases": [],
    "issues": [
      674
    ],
    "platforms": {
      "apple-tv": {
        "appName": "ImmichFrame",
        "launchStrategy": "source",
        "sourceAliases": [],
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/674"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/674",
      "https://apps.apple.com/us/app/immichframe/id6742748077"
    ],
    "notes": [
      "No matching native preset in local catalog. Add this app/variant only after validating supplied package/source/channel evidence on the requested platform; never derive an activity from a foreground surface alone."
    ],
    "displayName": "ImmichFrame",
    "observedEvidence": []
  },
  {
    "id": "vidangel",
    "aliases": [],
    "issues": [
      675
    ],
    "platforms": {
      "apple-tv": {
        "appName": "VidAngel",
        "launchStrategy": "source",
        "sourceAliases": [],
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/675"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/675",
      "https://apps.apple.com/us/app/vidangel/id999547807"
    ],
    "notes": [
      "No matching native preset in local catalog. Add this app/variant only after validating supplied package/source/channel evidence on the requested platform; never derive an activity from a foreground surface alone."
    ],
    "displayName": "VidAngel",
    "observedEvidence": []
  },
  {
    "id": "waipuTV",
    "aliases": [],
    "issues": [
      676
    ],
    "platforms": {
      "roku": {
        "appName": "waipu.tv",
        "launchStrategy": "source",
        "sourceAliases": [],
        "app-id": 677369,
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/676"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/676",
      "https://channelstore.roku.com/details/feb1108c128e0958073cf8d972be2010:ac72be8505fff107b73be0a401cfc98f/waiputv"
    ],
    "notes": [
      "Waipu Roku missing from waipuTV. Request supplies channel 677369 and source waipu.tv; Android and Apple entries already exist. Add Roku using channel evidence."
    ],
    "observedEvidence": [
      {
        "kind": "app_id",
        "value": "677369",
        "source": "https://github.com/PRProd/HA-Firemote/issues/676",
        "issue": 676
      },
      {
        "kind": "app_name",
        "value": "waipu.tv",
        "source": "https://github.com/PRProd/HA-Firemote/issues/676",
        "issue": 676
      },
      {
        "kind": "source",
        "value": "waipu.tv",
        "source": "https://github.com/PRProd/HA-Firemote/issues/676",
        "issue": 676
      }
    ]
  },
  {
    "id": "iptvstreamplayer",
    "aliases": [],
    "issues": [
      680
    ],
    "platforms": {
      "chromecast": {
        "appName": "com.digitalseva.iptvplayer",
        "androidName": "com.digitalseva.iptvplayer",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/680"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/680",
      "https://play.google.com/store/apps/details?id=com.digitalseva.iptvplayer&hl=en"
    ],
    "notes": [
      "No matching native preset in local catalog. Add this app/variant only after validating supplied package/source/channel evidence on the requested platform; never derive an activity from a foreground surface alone."
    ],
    "displayName": "IPTV Stream Player",
    "observedEvidence": [
      {
        "kind": "app_id",
        "value": "com.digitalseva.iptvplayer",
        "source": "https://github.com/PRProd/HA-Firemote/issues/680",
        "issue": 680
      },
      {
        "kind": "app_name",
        "value": "com.digitalseva.iptvplayer",
        "source": "https://github.com/PRProd/HA-Firemote/issues/680",
        "issue": 680
      },
      {
        "kind": "source",
        "value": "com.digitalseva.iptvplayer",
        "source": "https://github.com/PRProd/HA-Firemote/issues/680",
        "issue": 680
      }
    ]
  },
  {
    "id": "vodafone-tv-pt",
    "aliases": [],
    "issues": [
      681
    ],
    "platforms": {
      "nvidia-shield": {
        "appName": "com.vodafone.vtv.atv.pt",
        "androidName": "com.vodafone.vtv.atv.pt",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/681"
          }
        ]
      },
      "xiaomi": {
        "appName": "com.vodafone.vtv.atv.pt",
        "androidName": "com.vodafone.vtv.atv.pt",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/681"
          }
        ]
      }
    },
    "incompleteFamilies": {
      "apple-tv": "Exact installed source name is absent from the reviewed request."
    },
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/681",
      "https://play.google.com/store/apps/details?id=com.vodafone.vtv.pt&hl=pt_PT"
    ],
    "notes": [
      "Vodafone Portugal: TV package com.vodafone.vtv.atv.pt differs from linked mobile com.vodafone.vtv.pt. Observed LivePlaybackActivity is a playback screen, not proven launch entry. Xiaomi/Shield need cold-launch test; Apple TV has no source-list evidence and stays blocked."
    ],
    "displayName": "Vodafone TV (PT)",
    "region": "PT",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "com.vodafone.vtv.atv.pt/com.witsoftware.vodafonetv.view.playback.LivePlaybackActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/681",
        "issue": 681
      }
    ]
  },
  {
    "id": "x3mplayer",
    "aliases": [],
    "issues": [
      682
    ],
    "platforms": {
      "amazon-fire": {
        "appName": "app.xeev.xeplayer",
        "androidName": "app.xeev.xeplayer",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/682"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/682",
      "https://xtream-editor.com/files/x.apk"
    ],
    "notes": [
      "No matching native preset in local catalog. Add this app/variant only after validating supplied package/source/channel evidence on the requested platform; never derive an activity from a foreground surface alone."
    ],
    "displayName": "X3M Player",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "app.xeev.xeplayer/app.xeev.xeplayer.tv.live.LiveActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/682",
        "issue": 682
      },
      {
        "kind": "observed_component",
        "value": "app.xeev.xeplayer/.tv.live.LiveActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/682",
        "issue": 682
      }
    ]
  },
  {
    "id": "freespeechtv",
    "aliases": [],
    "issues": [
      683
    ],
    "platforms": {
      "apple-tv": {
        "appName": "Free Speech TV",
        "launchStrategy": "source",
        "sourceAliases": [],
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/683"
          }
        ]
      },
      "roku": {
        "appName": "Free Speech TV - FSTV",
        "launchStrategy": "source",
        "sourceAliases": [],
        "app-id": 9060,
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/683"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/683",
      "https://channelstore.roku.com/details/eadfccb71b4400f326e0bc141dd53095:7780f81a366573f175a9fead987ad3da/free-speech-tv-fstv"
    ],
    "notes": [
      "No matching native preset in local catalog. Add this app/variant only after validating supplied package/source/channel evidence on the requested platform; never derive an activity from a foreground surface alone."
    ],
    "displayName": "FreeSpeech TV",
    "observedEvidence": [
      {
        "kind": "app_id",
        "value": "9060",
        "source": "https://github.com/PRProd/HA-Firemote/issues/683",
        "issue": 683
      },
      {
        "kind": "app_name",
        "value": "Free Speech TV - FSTV",
        "source": "https://github.com/PRProd/HA-Firemote/issues/683",
        "issue": 683
      },
      {
        "kind": "source",
        "value": "Free Speech TV - FSTV",
        "source": "https://github.com/PRProd/HA-Firemote/issues/683",
        "issue": 683
      }
    ]
  },
  {
    "id": "hydravion",
    "aliases": [],
    "issues": [
      684
    ],
    "platforms": {
      "roku": {
        "appName": "Hydravion",
        "launchStrategy": "source",
        "sourceAliases": [],
        "app-id": 644040,
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/684"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/684",
      "https://channelstore.roku.com/details/9e604ceb9c7513dc8c69ce4b9f2cacac:21bd00d3a6b450da8922ff156823e9b7/hydravion"
    ],
    "notes": [
      "No matching native preset in local catalog. Add this app/variant only after validating supplied package/source/channel evidence on the requested platform; never derive an activity from a foreground surface alone."
    ],
    "displayName": "Hydravion",
    "observedEvidence": [
      {
        "kind": "app_id",
        "value": "644040",
        "source": "https://github.com/PRProd/HA-Firemote/issues/684",
        "issue": 684
      },
      {
        "kind": "app_name",
        "value": "Hydravion",
        "source": "https://github.com/PRProd/HA-Firemote/issues/684",
        "issue": 684
      },
      {
        "kind": "source",
        "value": "Hydravion",
        "source": "https://github.com/PRProd/HA-Firemote/issues/684",
        "issue": 684
      }
    ]
  },
  {
    "id": "microiptv",
    "aliases": [],
    "issues": [
      691,
      804
    ],
    "platforms": {
      "apple-tv": {
        "appName": "MicroIPTV",
        "launchStrategy": "source",
        "sourceAliases": [],
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/804"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/691",
      "https://apps.apple.com/ua/app/microiptv/id6469873633",
      "https://github.com/PRProd/HA-Firemote/issues/804",
      "https://apps.apple.com/cy/app/microiptv/id6469873633"
    ],
    "notes": [
      "Individual request has no tvOS source, but same App Store id 6469873633 appears in #804 with source MicroIPTV. Use #804 as cross-request evidence, then verify on device.",
      "MicroIPTV source supplied; same App Store id as #691. Active Music bundle id is unrelated and must be ignored."
    ],
    "displayName": "MicroIPTV",
    "observedEvidence": [
      {
        "kind": "app_id",
        "value": "com.apple.TVMusic",
        "source": "https://github.com/PRProd/HA-Firemote/issues/804",
        "issue": 804
      },
      {
        "kind": "app_name",
        "value": "Music",
        "source": "https://github.com/PRProd/HA-Firemote/issues/804",
        "issue": 804
      }
    ]
  },
  {
    "id": "emby-android",
    "aliases": [],
    "issues": [
      695
    ],
    "platforms": {
      "chromecast": {
        "appName": "com.mb.android",
        "androidName": "com.mb.android",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/695"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/695",
      "https://play.google.com/store/apps/details?id=com.mb.android"
    ],
    "notes": [
      "Emby Android mobile/unified app com.mb.android/com.mb.android.MainActivity differs from existing tv.emby.embyatv Android TV preset. Requester reports successful HA select_source workaround for the new package; preserve both installs."
    ],
    "displayName": "Emby Android (in addition to Emby Android TV)",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "com.mb.android/com.mb.android.MainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/695",
        "issue": 695
      }
    ]
  },
  {
    "id": "monumental",
    "aliases": [],
    "issues": [
      696
    ],
    "platforms": {
      "apple-tv": {
        "appName": "Monumental+",
        "launchStrategy": "source",
        "sourceAliases": [],
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/696"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/696",
      "https://apps.apple.com/us/app/monumental/id1082655562"
    ],
    "notes": [
      "No matching native preset in local catalog. Add this app/variant only after validating supplied package/source/channel evidence on the requested platform; never derive an activity from a foreground surface alone."
    ],
    "displayName": "Monumental+",
    "observedEvidence": []
  },
  {
    "id": "zapping",
    "aliases": [],
    "issues": [
      697,
      718
    ],
    "platforms": {
      "chromecast": {
        "appName": "com.eltelon.zapping",
        "androidName": "com.eltelon.zapping",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/718"
          }
        ]
      },
      "homatics": {
        "appName": "com.eltelon.zapping",
        "androidName": "com.eltelon.zapping",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/718"
          }
        ]
      },
      "nvidia-shield": {
        "appName": "com.eltelon.zapping",
        "androidName": "com.eltelon.zapping",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/718"
          }
        ]
      },
      "onn": {
        "appName": "com.eltelon.zapping",
        "androidName": "com.eltelon.zapping",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/718"
          }
        ]
      },
      "xiaomi": {
        "appName": "com.eltelon.zapping",
        "androidName": "com.eltelon.zapping",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/718"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/697",
      "https://play.google.com/store/apps/details?id=com.eltelon.zapping",
      "https://github.com/PRProd/HA-Firemote/issues/718"
    ],
    "notes": [
      "No matching native preset in local catalog. Add this app/variant only after validating supplied package/source/channel evidence on the requested platform; never derive an activity from a foreground surface alone."
    ],
    "displayName": "Zapping",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "com.eltelon.zapping/com.eltelon.zapping.MainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/697",
        "issue": 697
      },
      {
        "kind": "observed_component",
        "value": "com.eltelon.zapping/com.eltelon.zapping.MainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/718",
        "issue": 718
      }
    ]
  },
  {
    "id": "vradio",
    "aliases": [],
    "issues": [
      700
    ],
    "platforms": {
      "chromecast": {
        "appName": "com.ilv.vradio",
        "androidName": "com.ilv.vradio",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/700"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/700",
      "https://play.google.com/store/apps/details?id=com.ilv.vradio"
    ],
    "notes": [
      "VRadio package com.ilv.vradio and component com.ilv.vradio/com.ilv.vradiotv.MainActivity are in the device dump and store URL. Optional com.ilv.radio is a typo, not another identifier."
    ],
    "displayName": "Vradio",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "com.ilv.vradio/com.ilv.vradiotv.MainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/700",
        "issue": 700
      }
    ]
  },
  {
    "id": "babycam",
    "aliases": [],
    "issues": [
      702
    ],
    "platforms": {
      "chromecast": {
        "appName": "com.arjonasoftware.babycam",
        "androidName": "com.arjonasoftware.babycam",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/702"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/702",
      "https://play.google.com/store/apps/details?id=com.arjonasoftware.babycam"
    ],
    "notes": [
      "Body shows ClientActivity, but comment 2993611499 supplies SplashScreenActivity as the launch candidate. Use com.arjonasoftware.babycam/com.arjonasoftware.babycam.SplashScreenActivity only after cold/warm validation; no explicit success confirmation."
    ],
    "displayName": "BabyCam",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "com.arjonasoftware.babycam/com.arjonasoftware.babycam.client.ClientActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/702",
        "issue": 702
      },
      {
        "kind": "observed_component",
        "value": "com.arjonasoftware.babycam/com.arjonasoftware.babycam.SplashScreenActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/702#issuecomment-2993611499",
        "issue": 702
      }
    ]
  },
  {
    "id": "talksport",
    "aliases": [],
    "issues": [
      703
    ],
    "platforms": {
      "amazon-fire": {
        "appName": "com.talksport.ctv",
        "androidName": "com.talksport.ctv",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/703"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/703",
      "https://www.amazon.com/News-Broadcasting-talkSPORT/dp/B0DQQ8NJLV/ref=sr_1_1?dib=eyJ2IjoiMSJ9.X8aA7YZJMlXp_Vb6kuq5fQ.7VEhvfS4z6lgcBNjTxL2EXu2cVGXmbJqMj-0KCQGt94&dib_tag=se&keywords=talksport&qid=1750924322&s=mobile-apps&sr=1-1"
    ],
    "notes": [
      "No matching native preset in local catalog. Add this app/variant only after validating supplied package/source/channel evidence on the requested platform; never derive an activity from a foreground surface alone."
    ],
    "displayName": "Talksport",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "com.talksport.ctv/com.simplestream.presentation.player.ExoPlayerActivityTV",
        "source": "https://github.com/PRProd/HA-Firemote/issues/703",
        "issue": 703
      }
    ]
  },
  {
    "id": "anigamer",
    "aliases": [
      "巴哈姆特動畫瘋"
    ],
    "issues": [
      705
    ],
    "platforms": {
      "chromecast": {
        "appName": "tw.com.gamer.android.animad",
        "androidName": "tw.com.gamer.android.animad",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/705"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/705",
      "https://play.google.com/store/apps/details?id=tw.com.gamer.android.animad"
    ],
    "notes": [
      "aniGamer / 巴哈姆特動畫瘋 (Taiwan). Requester explicitly confirms launching tw.com.gamer.android.animad/tw.com.gamer.android.animad.tv.ui.TVAnimadActivity in comment 3022970071. Preserve Unicode name plus search alias."
    ],
    "displayName": "巴哈姆特動畫瘋 / aniGamer",
    "region": "TW",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "tw.com.gamer.android.animad/tw.com.gamer.android.animad.tv.ui.TVAnimadActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/705",
        "issue": 705
      },
      {
        "kind": "observed_component",
        "value": "tw.com.gamer.android.animad/tw.com.gamer.android.animad.tv.ui.TVAnimadActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/705#issuecomment-3022970071",
        "issue": 705
      }
    ]
  },
  {
    "id": "pxplayremoteplay",
    "aliases": [],
    "issues": [
      706
    ],
    "platforms": {
      "chromecast": {
        "appName": "psplay.grill.com",
        "androidName": "psplay.grill.com",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/706"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/706",
      "https://play.google.com/store/apps/details?id=psplay.grill.com"
    ],
    "notes": [
      "PXPlay: requester explicitly says psplay.grill.com/com.grill.psplay.MainActivity works and HomeActivity from the foreground dump does not. Test MainActivity; do not adopt HomeActivity."
    ],
    "displayName": "PXPlay: Remote Play",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "psplay.grill.com/com.grill.psplay.HomeActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/706",
        "issue": 706
      },
      {
        "kind": "observed_component",
        "value": "psplay.grill.com/com.grill.psplay.MainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/706",
        "issue": 706
      }
    ]
  },
  {
    "id": "tod",
    "aliases": [],
    "issues": [
      708
    ],
    "platforms": {
      "nvidia-shield": {
        "appName": "com.todtv.tod",
        "androidName": "com.todtv.tod",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/708"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/708",
      "https://play.google.com/store/apps/details?id=com.todtv.tod"
    ],
    "notes": [
      "No matching native preset in local catalog. Add this app/variant only after validating supplied package/source/channel evidence on the requested platform; never derive an activity from a foreground surface alone."
    ],
    "displayName": "Tod",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "com.todtv.tod/com.todtv.tod.MainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/708",
        "issue": 708
      }
    ]
  },
  {
    "id": "cnbc",
    "aliases": [],
    "issues": [
      709
    ],
    "platforms": {
      "apple-tv": {
        "appName": "CNBC",
        "launchStrategy": "source",
        "sourceAliases": [],
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/709"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/709",
      "https://apps.apple.com/xk/app/cnbc-stock-market-business/id398018310"
    ],
    "notes": [
      "Apple TV source CNBC is in source_list. Active app_id com.google.ios.youtube belongs to YouTube and must not be attached to CNBC."
    ],
    "displayName": "CNBC",
    "observedEvidence": [
      {
        "kind": "app_id",
        "value": "com.google.ios.youtube",
        "source": "https://github.com/PRProd/HA-Firemote/issues/709",
        "issue": 709
      },
      {
        "kind": "app_name",
        "value": "YouTube",
        "source": "https://github.com/PRProd/HA-Firemote/issues/709",
        "issue": 709
      }
    ]
  },
  {
    "id": "synology-photos",
    "aliases": [],
    "issues": [
      710
    ],
    "platforms": {
      "nvidia-shield": {
        "appName": "com.synology.projectkailash",
        "androidName": "com.synology.projectkailash",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/710"
          }
        ]
      },
      "chromecast": {
        "appName": "com.synology.projectkailash",
        "androidName": "com.synology.projectkailash",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/710"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/710",
      "https://play.google.com/store/apps/details?id=com.synology.projectkailash&hl=en-US"
    ],
    "notes": [
      "synology-photos exists only on Apple TV. Requested Android platforms link com.synology.projectkailash (a store package), with no Android TV activity or working launch. Validate TV-compatible app/build; do not reuse tvOS source name."
    ],
    "observedEvidence": []
  },
  {
    "id": "unsersandmannchen",
    "aliases": [],
    "issues": [
      712
    ],
    "platforms": {
      "amazon-fire": {
        "appName": "com.amazon.rialto.cordova.webapp.webapp922f9e57af434b9082e2ea125127ead1",
        "androidName": "com.amazon.rialto.cordova.webapp.webapp922f9e57af434b9082e2ea125127ead1",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/712"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/712",
      "https://www.amazon.de/Rundfunk-Berlin-Brandenburg-Unser-Sandm%C3%A4nnchen/dp/B014TFKZE2"
    ],
    "notes": [
      "No matching native preset in local catalog. Add this app/variant only after validating supplied package/source/channel evidence on the requested platform; never derive an activity from a foreground surface alone."
    ],
    "displayName": "Unser Sandmännchen",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "com.amazon.rialto.cordova.webapp.webapp922f9e57af434b9082e2ea125127ead1/com.amazon.rialto.cordova.webapp.webapp922f9e57af434b9082e2ea125127ead1.MainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/712",
        "issue": 712
      }
    ]
  },
  {
    "id": "beeline-tv",
    "aliases": [
      "билаинтв"
    ],
    "issues": [
      713
    ],
    "platforms": {
      "xiaomi": {
        "appName": "ru.beeline.tve.android",
        "androidName": "ru.beeline.tve.android",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/713"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/713",
      "https://play.google.com/store/apps/details?id=ru.beeline.tve.android&hl=ru&pli=1"
    ],
    "notes": [
      "No matching native preset in local catalog. Add this app/variant only after validating supplied package/source/channel evidence on the requested platform; never derive an activity from a foreground surface alone."
    ],
    "displayName": "Билайн ТВ",
    "region": "RU",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "ru.beeline.tve.android/com.iwedia.ui.beeline.ui.MainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/713",
        "issue": 713
      }
    ]
  },
  {
    "id": "adguardvpn",
    "aliases": [],
    "issues": [
      714
    ],
    "platforms": {
      "xiaomi": {
        "appName": "com.adguard.vpn",
        "androidName": "com.adguard.vpn",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/714"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/714",
      "https://play.google.com/store/apps/details?id=com.adguard.vpn&hl=ru"
    ],
    "notes": [
      "No matching native preset in local catalog. Add this app/variant only after validating supplied package/source/channel evidence on the requested platform; never derive an activity from a foreground surface alone."
    ],
    "displayName": "Adguard VPN",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "com.adguard.vpn/com.adguard.vpn.ui.tv.TvMainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/714",
        "issue": 714
      }
    ]
  },
  {
    "id": "vk-video-tv",
    "aliases": [
      "vkвидео"
    ],
    "issues": [
      715
    ],
    "platforms": {
      "xiaomi": {
        "appName": "com.vk.tv",
        "androidName": "com.vk.tv",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/715"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/715",
      "https://play.google.com/store/apps/details?id=com.vk.vkvideo&hl=ru"
    ],
    "notes": [
      "VK Video Android TV dump gives com.vk.tv/com.vk.tv.presentation.base.TvMainActivity; store URL names mobile com.vk.vkvideo. Use TV build identity, validate main entry; do not transplant mobile package."
    ],
    "displayName": "VK Видео (TV)",
    "region": "RU",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "com.vk.tv/com.vk.tv.presentation.base.TvMainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/715",
        "issue": 715
      }
    ]
  },
  {
    "id": "rutube-tv",
    "aliases": [
      "rutube"
    ],
    "issues": [
      716
    ],
    "platforms": {
      "xiaomi": {
        "appName": "ru.rutube.app",
        "androidName": "ru.rutube.app",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/716"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/716",
      "https://play.google.com/store/apps/details?id=rtb.mobile.android&hl=ru"
    ],
    "notes": [
      "Rutube TV dump uses ru.rutube.app/ru.rutube.app.MainActivity while store URL uses rtb.mobile.android. Keep TV/mobile distinction and verify installed launch action."
    ],
    "displayName": "Rutube (TV)",
    "region": "RU",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "ru.rutube.app/ru.rutube.app.MainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/716",
        "issue": 716
      }
    ]
  },
  {
    "id": "iptv-android",
    "aliases": [],
    "issues": [
      719
    ],
    "platforms": {
      "chromecast": {
        "appName": "ru.iptvremote.android.iptv",
        "androidName": "ru.iptvremote.android.iptv",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/719"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/719",
      "https://play.google.com/store/apps/details?id=ru.iptvremote.android.iptv"
    ],
    "notes": [
      "No matching native preset in local catalog. Add this app/variant only after validating supplied package/source/channel evidence on the requested platform; never derive an activity from a foreground surface alone."
    ],
    "displayName": "IPTV (Android)",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "ru.iptvremote.android.iptv/ru.iptvremote.android.iptv.ChannelsActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/719",
        "issue": 719
      }
    ]
  },
  {
    "id": "streamshow",
    "aliases": [],
    "issues": [
      726
    ],
    "platforms": {
      "chromecast": {
        "appName": "com.devinterestdev.streamshow",
        "androidName": "com.devinterestdev.streamshow",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/726"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/726",
      "https://play.google.com/store/apps/details?id=com.devinterestdev.streamshow"
    ],
    "notes": [
      "Store supplies package com.devinterestdev.streamshow only; no tested activity. Try package-based launch in the selected Android integration, then capture result; do not invent a component."
    ],
    "displayName": "StreamShow",
    "observedEvidence": []
  },
  {
    "id": "shudder",
    "aliases": [],
    "issues": [
      749,
      769
    ],
    "platforms": {
      "roku": {
        "appName": "Shudder",
        "launchStrategy": "source",
        "sourceAliases": [],
        "app-id": 59997,
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/749"
          }
        ]
      },
      "apple-tv": {
        "appName": "Shudder",
        "launchStrategy": "source",
        "sourceAliases": [],
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/769"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/749",
      "https://channelstore.roku.com/details/78d8c295a23ae2dcb5c2e4086190f98d:5308d0e6f38f6387281e8c95bfe5c830/shudder",
      "https://github.com/PRProd/HA-Firemote/issues/769",
      "https://apps.apple.com/us/app/shudder-horror-thrillers/id919790315"
    ],
    "notes": [
      "No matching native preset in local catalog. Add this app/variant only after validating supplied package/source/channel evidence on the requested platform; never derive an activity from a foreground surface alone."
    ],
    "displayName": "Shudder",
    "observedEvidence": [
      {
        "kind": "app_id",
        "value": "59997",
        "source": "https://github.com/PRProd/HA-Firemote/issues/749",
        "issue": 749
      },
      {
        "kind": "app_name",
        "value": "Shudder",
        "source": "https://github.com/PRProd/HA-Firemote/issues/749",
        "issue": 749
      },
      {
        "kind": "source",
        "value": "Shudder",
        "source": "https://github.com/PRProd/HA-Firemote/issues/749",
        "issue": 749
      }
    ]
  },
  {
    "id": "fizztv",
    "aliases": [],
    "issues": [
      751
    ],
    "platforms": {
      "amazon-fire": {
        "appName": "ca.fizz_app.tv.amazon",
        "androidName": "ca.fizz_app.tv.amazon",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/751"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/751",
      "https://play.google.com/store/apps/details?id=ca.fizz_app.tv&hl=en_CA"
    ],
    "notes": [
      "Fizz TV Fire dump gives ca.fizz_app.tv.amazon; store package ca.fizz_app.tv differs. Foreground TVPlaybackActivity is not a demonstrated cold-launch activity; validate Fire main entry."
    ],
    "displayName": "Fizz TV",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "ca.fizz_app.tv.amazon/com.vmedia.tv.activities.TVPlaybackActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/751",
        "issue": 751
      }
    ]
  },
  {
    "id": "cbs",
    "aliases": [],
    "issues": [
      753
    ],
    "platforms": {
      "roku": {
        "appName": "CBS",
        "launchStrategy": "source",
        "sourceAliases": [],
        "app-id": 619667,
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/753"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/753",
      "https://channelstore.roku.com/details/a71185c82d34110ed677752b6bb203b3:47618811fb7bab3b6681f6cb11ea51b3/cbs"
    ],
    "notes": [
      "No matching native preset in local catalog. Add this app/variant only after validating supplied package/source/channel evidence on the requested platform; never derive an activity from a foreground surface alone."
    ],
    "displayName": "CBS",
    "observedEvidence": [
      {
        "kind": "app_id",
        "value": "619667",
        "source": "https://github.com/PRProd/HA-Firemote/issues/753",
        "issue": 753
      },
      {
        "kind": "app_name",
        "value": "CBS",
        "source": "https://github.com/PRProd/HA-Firemote/issues/753",
        "issue": 753
      },
      {
        "kind": "source",
        "value": "CBS",
        "source": "https://github.com/PRProd/HA-Firemote/issues/753",
        "issue": 753
      }
    ]
  },
  {
    "id": "zitotv2go",
    "aliases": [],
    "issues": [
      754
    ],
    "platforms": {
      "roku": {
        "appName": "ZITOTV2GO",
        "launchStrategy": "source",
        "sourceAliases": [],
        "app-id": 578206,
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/754"
          }
        ]
      }
    },
    "incompleteFamilies": {
      "amazon-fire": "No package, exported launcher or working integration action was supplied."
    },
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/754",
      "https://channelstore.roku.com/details/a061ee0be081a182ef4ded2af5bf64a4:7a130c459954ba19f93bf0b355c1d8e1/zitotv2go"
    ],
    "notes": [
      "Roku ZITOTV2GO channel 578206 and source supplied. Amazon Fire also selected, but requester explicitly has no Fire identifier; implement/test Roku separately and keep Fire evidence-gated."
    ],
    "displayName": "ZitoTV2Go",
    "observedEvidence": [
      {
        "kind": "app_id",
        "value": "578206",
        "source": "https://github.com/PRProd/HA-Firemote/issues/754",
        "issue": 754
      },
      {
        "kind": "app_name",
        "value": "ZITOTV2GO",
        "source": "https://github.com/PRProd/HA-Firemote/issues/754",
        "issue": 754
      },
      {
        "kind": "source",
        "value": "ZITOTV2GO",
        "source": "https://github.com/PRProd/HA-Firemote/issues/754",
        "issue": 754
      }
    ]
  },
  {
    "id": "youtv",
    "aliases": [],
    "issues": [
      758
    ],
    "platforms": {
      "apple-tv": {
        "appName": "YouTV",
        "launchStrategy": "source",
        "sourceAliases": [],
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/758"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/758"
    ],
    "notes": [
      "No matching native preset in local catalog. Add this app/variant only after validating supplied package/source/channel evidence on the requested platform; never derive an activity from a foreground surface alone."
    ],
    "displayName": "YouTV",
    "observedEvidence": []
  },
  {
    "id": "free-tv-fr",
    "aliases": [],
    "issues": [
      761,
      777
    ],
    "platforms": {
      "apple-tv": {
        "appName": "Free TV",
        "launchStrategy": "source",
        "sourceAliases": [],
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/761"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/777"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/761",
      "https://apps.apple.com/fr/app/free-tv/id1542614107",
      "https://github.com/PRProd/HA-Firemote/issues/777"
    ],
    "notes": [
      "French Free TV, App Store id 1542614107, source Free TV. Different product from Israeli free-tv (tv.freetv.androidtv) shipped in #401. Create distinct identity/alias group.",
      "Duplicates French Free TV #761; optional comments also explicitly request Orange TV and fixes for Music/CANAL+. Sources Free TV, Orange TV, Musique, CANAL+ supplied. Orange Android preset lacks tvOS; Music fr alias already translates Music->Musique. CANAL+ remains rename regression."
    ],
    "displayName": "Free TV (FR)",
    "region": "FR",
    "observedEvidence": []
  },
  {
    "id": "radioreceiver",
    "aliases": [],
    "issues": [
      763
    ],
    "platforms": {
      "apple-tv": {
        "appName": "Receiver",
        "launchStrategy": "source",
        "sourceAliases": [],
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/763"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/763",
      "https://apps.apple.com/de/app/radio-receiver/id311658127"
    ],
    "notes": [
      "Store title Radio - Receiver; exact tvOS source is Receiver. Empty app_id is not a blocker for select_source."
    ],
    "displayName": "Radio - Receiver",
    "observedEvidence": [
      {
        "kind": "app_id",
        "value": "### Optional Comments",
        "source": "https://github.com/PRProd/HA-Firemote/issues/763",
        "issue": 763
      }
    ]
  },
  {
    "id": "proton-vpn",
    "aliases": [],
    "issues": [
      765,
      817,
      734
    ],
    "platforms": {
      "nvidia-shield": {
        "appName": "ch.protonvpn.android",
        "androidName": "ch.protonvpn.android",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/765"
          }
        ]
      },
      "amazon-fire": {
        "appName": "ch.protonvpn.android",
        "androidName": "ch.protonvpn.android",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/817"
          }
        ]
      },
      "apple-tv": {
        "appName": "Proton VPN",
        "launchStrategy": "source",
        "sourceAliases": [],
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/734"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/765",
      "https://play.google.com/store/apps/details?id=ch.protonvpn.android",
      "https://github.com/PRProd/HA-Firemote/issues/817",
      "https://www.amazon.com/Proton-VPN-Unlimited-Streaming-Countries/dp/B09RFFWTFM/ref=sr_1_1?dib=eyJ2IjoiMSJ9.1DjQLvH2JCcrxmzczpqwNkjGoj7dM8NWPaW2Kk1kTg2Yf0mu3sEmHUO3eO4cNDZsEvkyBLzgV7cDKBialS9MTjzMSezJEmNEMjkHa4tVHQtEk862YqhcGJmWa8bpCnHxLJrRrLXiRQkY_XK_jvIG5g.34QOgXL7x_pbtrElC5JVhz_XPAOC6QyJbowtFs1-Y_Q&dib_tag=se&keywords=proton+vpn&qid=1777277091&s=mobile-apps&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sr=1-1",
      "https://github.com/PRProd/HA-Firemote/issues/734"
    ],
    "notes": [
      "Proton VPN Shield package ch.protonvpn.android with TvMainActivity supplied. Cross-platform siblings #734 tvOS and #817 Fire; #817 explicitly reports working custom launcher.",
      "Fire custom launcher explicitly uses ch.protonvpn.android/com.protonvpn.android.tv.main.TvMainActivity; requester supplies screenshot and working YAML. Group with #765 Shield and #734 tvOS; keep platforms independently verified.",
      "Two apps: Omni source Omni and Proton VPN source Proton VPN. Comment 3482845655 resolves Omni identity to Omni - Content Hub, App Store id 6741470807. Do not retain the obsolete ambiguity or merge with Omni Fiber/Omni TV."
    ],
    "displayName": "Proton VPN",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "ch.protonvpn.android/com.protonvpn.android.tv.main.TvMainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/765",
        "issue": 765
      },
      {
        "kind": "observed_component",
        "value": "ch.protonvpn.android/com.protonvpn.android.tv.main.TvMainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/817",
        "issue": 817
      }
    ]
  },
  {
    "id": "symfonium",
    "aliases": [],
    "issues": [
      770
    ],
    "platforms": {
      "chromecast": {
        "appName": "app.symfonik.music.player",
        "androidName": "app.symfonik.music.player",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/770"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/770",
      "https://play.google.com/store/apps/details?id=app.symfonik.music.player&referrer=utm_source%3Dwebsite%26utm_medium%3Ddownload"
    ],
    "notes": [
      "No matching native preset in local catalog. Add this app/variant only after validating supplied package/source/channel evidence on the requested platform; never derive an activity from a foreground surface alone."
    ],
    "displayName": "Symfonium",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "app.symfonik.music.player/app.symfonik.ui.StartActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/770",
        "issue": 770
      }
    ]
  },
  {
    "id": "helix-tv",
    "aliases": [],
    "issues": [
      771
    ],
    "platforms": {
      "apple-tv": {
        "appName": "Helix TV",
        "launchStrategy": "source",
        "sourceAliases": [],
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/771"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/771",
      "https://apps.apple.com/ca/app/helix-tv/id1440633931"
    ],
    "notes": [
      "helix-tv exists on Android families only. Add Apple TV source Helix TV as reported, preserving Canadian/French locale name."
    ],
    "observedEvidence": []
  },
  {
    "id": "iptvexpert",
    "aliases": [],
    "issues": [
      773
    ],
    "platforms": {
      "apple-tv": {
        "appName": "IPTV Expert",
        "launchStrategy": "source",
        "sourceAliases": [],
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/773"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/773",
      "https://apps.apple.com/us/app/iptv-smarters-player-expert/id1641944027"
    ],
    "notes": [
      "No matching native preset in local catalog. Add this app/variant only after validating supplied package/source/channel evidence on the requested platform; never derive an activity from a foreground surface alone."
    ],
    "displayName": "IPTV Expert",
    "observedEvidence": []
  },
  {
    "id": "tele2play",
    "aliases": [],
    "issues": [
      775
    ],
    "platforms": {
      "chromecast": {
        "appName": "com.tivo.android.comhem",
        "androidName": "com.tivo.android.comhem",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/775"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/775",
      "https://play.google.com/store/apps/details?id=com.tivo.android.comhem"
    ],
    "notes": [
      "No matching native preset in local catalog. Add this app/variant only after validating supplied package/source/channel evidence on the requested platform; never derive an activity from a foreground surface alone."
    ],
    "displayName": "Tele2 Play",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "com.tivo.android.comhem/tv.threess.threeready.ui.generic.activity.MainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/775",
        "issue": 775
      }
    ]
  },
  {
    "id": "wholphin",
    "aliases": [],
    "issues": [
      779,
      831
    ],
    "platforms": {
      "nvidia-shield": {
        "appName": "com.github.damontecres.wholphin",
        "androidName": "com.github.damontecres.wholphin",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/831"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/779",
      "https://play.google.com/store/apps/details?id=com.github.damontecres.wholphin",
      "https://github.com/damontecres/Wholphin/releases/latest",
      "https://github.com/PRProd/HA-Firemote/issues/831",
      "https://play.google.com/store/apps/details?id=com.github.damontecres.wholphin&hl=en-US&pli=1"
    ],
    "notes": [
      "Wholphin package com.github.damontecres.wholphin supplied; commenter shows select_source custom launcher and #831 confirms it works. Group #779/#831, keep separate from Jellyfin/Swiftfin.",
      "Duplicate of #779 with MainActivity dump. Comment 5710835344 explicitly confirms select_source(com.github.damontecres.wholphin) works using supplied custom launcher."
    ],
    "displayName": "Wholphin",
    "observedEvidence": [
      {
        "kind": "source",
        "value": "com.github.damontecres.wholphin",
        "source": "https://github.com/PRProd/HA-Firemote/issues/779#issuecomment-5708987638",
        "issue": 779
      },
      {
        "kind": "observed_component",
        "value": "com.github.damontecres.wholphin/com.github.damontecres.wholphin.MainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/831",
        "issue": 831
      },
      {
        "kind": "source",
        "value": "com.github.damontecres.wholphin",
        "source": "https://github.com/PRProd/HA-Firemote/issues/831#issuecomment-5708999344",
        "issue": 831
      }
    ]
  },
  {
    "id": "senplayer",
    "aliases": [],
    "issues": [
      783
    ],
    "platforms": {
      "apple-tv": {
        "appName": "SenPlayer",
        "launchStrategy": "source",
        "sourceAliases": [],
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/783"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/783",
      "https://apps.apple.com/us/app/senplayer-media-player/id6443975850"
    ],
    "notes": [
      "Exact tvOS source is SenPlayer (capital S). Active YouTube TV bundle id is unrelated. Add source-based launcher only."
    ],
    "displayName": "senPlayer",
    "observedEvidence": [
      {
        "kind": "app_id",
        "value": "com.google.ios.youtubeunplugged",
        "source": "https://github.com/PRProd/HA-Firemote/issues/783",
        "issue": 783
      },
      {
        "kind": "app_name",
        "value": "YouTube TV",
        "source": "https://github.com/PRProd/HA-Firemote/issues/783",
        "issue": 783
      }
    ]
  },
  {
    "id": "dreitv",
    "aliases": [],
    "issues": [
      787
    ],
    "platforms": {
      "amazon-fire": {
        "appName": "com.drei.tv",
        "androidName": "com.drei.tv",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/787"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/787",
      "https://play.google.com/store/apps/details?id=com.drei.tv&hl=en&gl=AT"
    ],
    "notes": [
      "No matching native preset in local catalog. Add this app/variant only after validating supplied package/source/channel evidence on the requested platform; never derive an activity from a foreground surface alone."
    ],
    "displayName": "DreiTV",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "com.drei.tv/com.drei.tv.ui.MainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/787",
        "issue": 787
      }
    ]
  },
  {
    "id": "implayer-tv",
    "aliases": [],
    "issues": [
      788,
      803
    ],
    "platforms": {
      "apple-tv": {
        "appName": "iMPlayer",
        "launchStrategy": "source",
        "sourceAliases": [],
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/803"
          }
        ]
      }
    },
    "incompleteFamilies": {
      "roku": "Exact installed source name or Roku channel ID is absent from the reviewed request."
    },
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/788",
      "https://apps.apple.com/us/app/implayer-iptv-player/id6695725513",
      "https://github.com/PRProd/HA-Firemote/issues/803"
    ],
    "notes": [
      "implayer-tv exists on Android, lacks Apple TV. Source iMPlayer supplied; same app Store id and request family as #803.",
      "Apple TV iMPlayer source supplied; same tvOS app as #788. Chromecast already has implayer-tv; Roku requested without any channel ID/source proof, so keep Roku blocked."
    ],
    "observedEvidence": []
  },
  {
    "id": "victory-plus",
    "aliases": [],
    "issues": [
      790,
      791,
      792
    ],
    "platforms": {
      "roku": {
        "appName": "Victory+",
        "launchStrategy": "source",
        "sourceAliases": [],
        "app-id": 782126,
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/790"
          }
        ]
      },
      "chromecast": {
        "appName": "tv.apmc.android.victorysports",
        "androidName": "tv.apmc.android.victorysports",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/791"
          }
        ]
      },
      "amazon-fire": {
        "appName": "tv.apmc.android.victorysports",
        "androidName": "tv.apmc.android.victorysports",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/792"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/790",
      "https://channelstore.roku.com/details/a26c8398bca453948d544213ba7e3bbd:f6779d14b286dd6946e472db8128a41f/victory",
      "https://github.com/PRProd/HA-Firemote/issues/791",
      "https://play.google.com/store/apps/details?id=tv.apmc.android.victorysports&hl=en_US",
      "https://github.com/PRProd/HA-Firemote/issues/792",
      "https://www.amazon.com/Parent-Media-Co-Inc-Victory/dp/B0DDR9KMK3"
    ],
    "notes": [
      "No matching native preset in local catalog. Add this app/variant only after validating supplied package/source/channel evidence on the requested platform; never derive an activity from a foreground surface alone.",
      "Victory+ Chromecast package tv.apmc.android.victorysports supplied, no working activity in this platform. Fire #792 shares package but not automatically launch implementation; Roku #790 uses independent channel ID."
    ],
    "displayName": "Victory+",
    "observedEvidence": [
      {
        "kind": "app_id",
        "value": "782126",
        "source": "https://github.com/PRProd/HA-Firemote/issues/790",
        "issue": 790
      },
      {
        "kind": "app_name",
        "value": "Victory+",
        "source": "https://github.com/PRProd/HA-Firemote/issues/790",
        "issue": 790
      },
      {
        "kind": "source",
        "value": "Victory+",
        "source": "https://github.com/PRProd/HA-Firemote/issues/790",
        "issue": 790
      },
      {
        "kind": "app_id",
        "value": "tv.apmc.android.victorysports",
        "source": "https://github.com/PRProd/HA-Firemote/issues/791",
        "issue": 791
      },
      {
        "kind": "app_name",
        "value": "tv.apmc.android.victorysports",
        "source": "https://github.com/PRProd/HA-Firemote/issues/791",
        "issue": 791
      },
      {
        "kind": "source",
        "value": "tv.apmc.android.victorysports",
        "source": "https://github.com/PRProd/HA-Firemote/issues/791",
        "issue": 791
      },
      {
        "kind": "observed_component",
        "value": "tv.apmc.android.victorysports/tv.kidoodle.android.ui.newcontent.ActivityContent",
        "source": "https://github.com/PRProd/HA-Firemote/issues/792",
        "issue": 792
      }
    ]
  },
  {
    "id": "sledovanitv",
    "aliases": [],
    "issues": [
      795
    ],
    "platforms": {
      "homatics": {
        "appName": "cz.sledovanitv.android",
        "androidName": "cz.sledovanitv.android",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/795"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/795",
      "https://play.google.com/store/apps/details?id=cz.sledovanitv.android"
    ],
    "notes": [
      "SledovaniTV Homatics store package cz.sledovanitv.android supplied, but no actual device launch evidence. Existing PODA.tv is a different white-label app/package even though class namespaces overlap."
    ],
    "displayName": "SledovaniTV",
    "observedEvidence": []
  },
  {
    "id": "soop",
    "aliases": [],
    "issues": [
      798
    ],
    "platforms": {
      "nvidia-shield": {
        "appName": "kr.co.afreecatv.atv",
        "androidName": "kr.co.afreecatv.atv",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/798"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/798"
    ],
    "notes": [
      "Title incorrectly says Coupang Play; body requests SOOP and reports kr.co.afreecatv.atv/ui.activity.live.LiveVideoActivity. Body governs identity. Foreground video activity is not verified as cold launcher."
    ],
    "displayName": "SOOP (formerly AfreecaTV)",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "kr.co.afreecatv.atv/ui.activity.live.LiveVideoActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/798",
        "issue": 798
      }
    ]
  },
  {
    "id": "chzzk",
    "aliases": [],
    "issues": [
      799
    ],
    "platforms": {
      "nvidia-shield": {
        "appName": "com.escaperbgp.unofficial_chzzk_android_tv",
        "androidName": "com.escaperbgp.unofficial_chzzk_android_tv",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/799"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/799"
    ],
    "notes": [
      "No matching native preset in local catalog. Add this app/variant only after validating supplied package/source/channel evidence on the requested platform; never derive an activity from a foreground surface alone."
    ],
    "displayName": "Chzzk (unofficial Android TV client)",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "com.escaperbgp.unofficial_chzzk_android_tv/com.escaperbgp.unofficial_chzzk_android_tv.MainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/799",
        "issue": 799
      }
    ]
  },
  {
    "id": "coupang-play",
    "aliases": [],
    "issues": [
      800
    ],
    "platforms": {
      "nvidia-shield": {
        "appName": "com.coupang.mobile.play",
        "androidName": "com.coupang.mobile.play",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/800"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/800"
    ],
    "notes": [
      "coupang-play supports only Chromecast; Shield supplies com.coupang.mobile.play with foreground CouplayPlayerActivity. Existing Chromecast launches SplashActivity under older namespace; verify Shield's exported entry before reusing either."
    ],
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "com.coupang.mobile.play/com.coupang.play.features.cpplayer.CouplayPlayerActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/800",
        "issue": 800
      }
    ]
  },
  {
    "id": "wavve",
    "aliases": [],
    "issues": [
      801
    ],
    "platforms": {
      "nvidia-shield": {
        "appName": "kr.co.captv.pooq.tv",
        "androidName": "kr.co.captv.pooq.tv",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/801"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/801"
    ],
    "notes": [
      "No matching native preset in local catalog. Add this app/variant only after validating supplied package/source/channel evidence on the requested platform; never derive an activity from a foreground surface alone."
    ],
    "displayName": "Wavve",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "kr.co.captv.pooq.tv/kr.co.captv.pooq.detail.DetailActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/801",
        "issue": 801
      }
    ]
  },
  {
    "id": "bell-fibe-tv",
    "aliases": [],
    "issues": [
      805
    ],
    "platforms": {
      "chromecast": {
        "appName": "com.quickplay.android.bellmediaplayer",
        "androidName": "com.quickplay.android.bellmediaplayer",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/805"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/805",
      "https://play.google.com/store/apps/details?id=com.quickplay.android.bellmediaplayer"
    ],
    "notes": [
      "bell-fibe-tv exists for Fire and tvOS only. Chromecast store package com.quickplay.android.bellmediaplayer supplied; no verified launch on TV. Do not reuse Fire ca.bell.tv.firetv or tvOS Télé Fibe source."
    ],
    "observedEvidence": []
  },
  {
    "id": "hallmark",
    "aliases": [],
    "issues": [
      807
    ],
    "platforms": {
      "nvidia-shield": {
        "appName": "com.feeln.androidapp",
        "androidName": "com.feeln.androidapp",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/807"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/807",
      "https://play.google.com/store/search?q=hallmark+plus&c=apps"
    ],
    "notes": [
      "No matching native preset in local catalog. Add this app/variant only after validating supplied package/source/channel evidence on the requested platform; never derive an activity from a foreground surface alone."
    ],
    "displayName": "Hallmark+",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "com.feeln.androidapp/tv.accedo.one.app.bootstrap.BootstrapActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/807",
        "issue": 807
      }
    ]
  },
  {
    "id": "streamlocator",
    "aliases": [],
    "issues": [
      808
    ],
    "platforms": {
      "nvidia-shield": {
        "appName": "com.streamlocator.vpn",
        "androidName": "com.streamlocator.vpn",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/808"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/808",
      "https://play.google.com/store/apps/details?id=com.streamlocator.vpn"
    ],
    "notes": [
      "No matching native preset in local catalog. Add this app/variant only after validating supplied package/source/channel evidence on the requested platform; never derive an activity from a foreground surface alone."
    ],
    "displayName": "StreamLocator",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "com.streamlocator.vpn/com.streamlocator.vpn.ui.tv.home.TVHomeActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/808",
        "issue": 808
      }
    ]
  },
  {
    "id": "chillio",
    "aliases": [],
    "issues": [
      809
    ],
    "platforms": {
      "apple-tv": {
        "appName": "Chillio",
        "launchStrategy": "source",
        "sourceAliases": [],
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/809"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/809",
      "https://apps.apple.com/us/app/chillio-iptv-smart-player-pro/id6478813450"
    ],
    "notes": [
      "tvOS app_name Chillio and bundle com.elsonbaty.chillio supplied. Source-based launch candidate exists; no successful launch report."
    ],
    "displayName": "Chillio",
    "observedEvidence": [
      {
        "kind": "app_id",
        "value": "com.elsonbaty.chillio",
        "source": "https://github.com/PRProd/HA-Firemote/issues/809",
        "issue": 809
      },
      {
        "kind": "app_name",
        "value": "Chillio",
        "source": "https://github.com/PRProd/HA-Firemote/issues/809",
        "issue": 809
      }
    ]
  },
  {
    "id": "tcm",
    "aliases": [],
    "issues": [
      810
    ],
    "platforms": {
      "amazon-fire": {
        "appName": "com.tcm.apps.tv",
        "androidName": "com.tcm.apps.tv",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/810"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/810"
    ],
    "notes": [
      "WATCHTCM/TCM Fire package com.tcm.apps.tv and foreground MainController supplied. Preserve branding alias; test launch rather than assuming controller is exported launcher."
    ],
    "displayName": "TCM",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "com.tcm.apps.tv/com.tcm.apps.network.MainController",
        "source": "https://github.com/PRProd/HA-Firemote/issues/810",
        "issue": 810
      }
    ]
  },
  {
    "id": "swiptv",
    "aliases": [],
    "issues": [
      813
    ],
    "platforms": {
      "apple-tv": {
        "appName": "swiptv",
        "launchStrategy": "source",
        "sourceAliases": [],
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/813"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/813",
      "https://apps.apple.com/be/app/swiptv-iptv-player/id1658538188?l=fr-FR"
    ],
    "notes": [
      "Exact tvOS app/source name is lowercase swiptv; bundle com.Creativemind.swiptv supplied. Keep distinct from Swiftfin."
    ],
    "displayName": "Swiptv",
    "observedEvidence": [
      {
        "kind": "app_id",
        "value": "com.Creativemind.swiptv",
        "source": "https://github.com/PRProd/HA-Firemote/issues/813",
        "issue": 813
      },
      {
        "kind": "app_name",
        "value": "swiptv",
        "source": "https://github.com/PRProd/HA-Firemote/issues/813",
        "issue": 813
      }
    ]
  },
  {
    "id": "dnsnettv",
    "aliases": [],
    "issues": [
      818
    ],
    "platforms": {
      "amazon-fire": {
        "appName": "de.dnsnet.app.stb.amazon",
        "androidName": "de.dnsnet.app.stb.amazon",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/818"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/818"
    ],
    "notes": [
      "No matching native preset in local catalog. Add this app/variant only after validating supplied package/source/channel evidence on the requested platform; never derive an activity from a foreground surface alone."
    ],
    "displayName": "DNSNET TV",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "de.dnsnet.app.stb.amazon/de.dnsnet.app.stb.screens.menu.activity.MenuActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/818",
        "issue": 818
      }
    ]
  },
  {
    "id": "smarters4su",
    "aliases": [],
    "issues": [
      819
    ],
    "platforms": {
      "homatics": {
        "appName": "com.foursusmarters.foursusmartersiptvbox",
        "androidName": "com.foursusmarters.foursusmartersiptvbox",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/819"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/819"
    ],
    "notes": [
      "Smarters 4SU package com.foursusmarters.foursusmartersiptvbox is a separate provider-branded build, not interchangeable with IPTV Smarters Pro/Smarters Pro. Foreground player activity supplied; verify exported cold-launch entry."
    ],
    "displayName": "Smarters 4SU",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "com.foursusmarters.foursusmartersiptvbox/com.foursusmarters.foursusmartersiptvbox.view.ijkplayer.activities.NSTIJKPlayerSkyTvActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/819",
        "issue": 819
      }
    ]
  },
  {
    "id": "tizentube-cobalt",
    "aliases": [],
    "issues": [
      822,
      827
    ],
    "platforms": {
      "xiaomi": {
        "appName": "io.gh.reisxd.tizentube.cobalt",
        "androidName": "io.gh.reisxd.tizentube.cobalt",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/827"
          }
        ]
      },
      "nvidia-shield": {
        "appName": "io.gh.reisxd.tizentube.cobalt",
        "androidName": "io.gh.reisxd.tizentube.cobalt",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/822"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/827"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/822",
      "https://github.com/reisxd/TizenTubeCobalt",
      "https://github.com/PRProd/HA-Firemote/issues/827",
      "https://github.com/reisxd/TizenTubeCobalt/releases/download/v2.0.1/cobalt-arm64.apk"
    ],
    "notes": [
      "Tizentube Shield points to the same TizenTubeCobalt repository as #827. Xiaomi #827 supplies package io.gh.reisxd.tizentube.cobalt/dev.cobalt.app.MainActivity; reuse identity, but verify Shield compatibility independently.",
      "TizenTube Cobalt runs on requested Xiaomi Android, despite its name. Literal package/component io.gh.reisxd.tizentube.cobalt/dev.cobalt.app.MainActivity supplied; not Samsung Tizen integration."
    ],
    "displayName": "TizenTube Cobalt",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "io.gh.reisxd.tizentube.cobalt/dev.cobalt.app.MainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/827",
        "issue": 827
      }
    ]
  },
  {
    "id": "magenta-tv-gen1",
    "aliases": [
      "magenta-tv-first-generation"
    ],
    "issues": [
      824
    ],
    "platforms": {
      "nvidia-shield": {
        "appName": "de.telekom.magentatv.atv",
        "androidName": "de.telekom.magentatv.atv",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/824"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/824",
      "https://apps.apple.com/us/app/magentatv-1-generation/id1054468721"
    ],
    "notes": [
      "Magenta TV 1st generation DE package de.telekom.magentatv.atv/tv.accedo.xdk.dtag.MainActivity differs from current magenta-tv de.telekom.magentatv.androidtv/ApplicationMainActivity. Preserve generations; store link happens to be iOS, device dump is Android."
    ],
    "displayName": "MagentaTV (DE, 1st generation)",
    "region": "DE",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "de.telekom.magentatv.atv/tv.accedo.xdk.dtag.MainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/824",
        "issue": 824
      }
    ]
  },
  {
    "id": "o2tv",
    "aliases": [],
    "issues": [
      825
    ],
    "platforms": {
      "apple-tv": {
        "appName": "O₂ TV",
        "launchStrategy": "source",
        "sourceAliases": [],
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/825"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/825",
      "https://apps.apple.com/de/app/o2-tv/id6460936474?platform=tv"
    ],
    "notes": [
      "Exact German tvOS source is O₂ TV with subscript 2, not ASCII o2 TV. Store id6460936474 identifies German service."
    ],
    "displayName": "o2 TV",
    "region": "DE",
    "observedEvidence": []
  },
  {
    "id": "iptvsmarterstvlogik",
    "aliases": [],
    "issues": [
      826
    ],
    "platforms": {
      "amazon-fire": {
        "appName": "com.nst.iptvsmarterstvlogik",
        "androidName": "com.nst.iptvsmarterstvlogik",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/826"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/826"
    ],
    "notes": [
      "IPTV Smarters TV Logik package com.nst.iptvsmarterstvlogik distinct from other Smarters builds. Ignore trailing SmartTube input-method focus as unrelated; verify package's exported main activity."
    ],
    "displayName": "IPTV Smarters TV Logik",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "com.nst.iptvsmarterstvlogik/com.nst.iptvsmarterstvlogik.view.activity.NewDashboardActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/826",
        "issue": 826
      },
      {
        "kind": "observed_component",
        "value": "com.nst.iptvsmarterstvlogik/.view.activity.NewDashboardActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/826",
        "issue": 826
      },
      {
        "kind": "observed_component",
        "value": "com.liskovsoft.smarttubetv.beta/com.liskovsoft.smartyoutubetv2.tv.ui.search.tags.SearchTagsActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/826",
        "issue": 826
      }
    ]
  },
  {
    "id": "maxtv",
    "aliases": [],
    "issues": [
      839
    ],
    "platforms": {
      "amazon-fire": {
        "appName": "hr.telekom.android.maxtvp",
        "androidName": "hr.telekom.android.maxtvp",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/839"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/839",
      "https://play.google.com/store/apps/details?id=hr.telekom.android.maxtvp&hl=en"
    ],
    "notes": [
      "MaxTV Croatia/Hrvatski Telekom package hr.telekom.android.maxtvp supplied. Reporter configures Amazon Fire family to control TCL Google TV; test actual Android integration/OS rather than infer Fire OS from card family."
    ],
    "displayName": "MaxTV",
    "region": "HR",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "hr.telekom.android.maxtvp/com.telekom.atvretail.homeui.view.HomeActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/839",
        "issue": 839
      }
    ]
  },
  {
    "id": "neptune",
    "aliases": [],
    "issues": [
      853
    ],
    "platforms": {
      "apple-tv": {
        "appName": "Neptune",
        "launchStrategy": "source",
        "sourceAliases": [],
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/853"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/853"
    ],
    "notes": [
      "Apple TV source Neptune is supplied. Jellyfin client identity differs from Jellyfin/Swiftfin/Wholphin."
    ],
    "displayName": "Neptune",
    "observedEvidence": []
  },
  {
    "id": "plezy",
    "aliases": [],
    "issues": [
      861
    ],
    "platforms": {
      "amazon-fire": {
        "appName": "com.edde746.plezy",
        "androidName": "com.edde746.plezy",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/861"
          }
        ]
      },
      "chromecast": {
        "appName": "com.edde746.plezy",
        "androidName": "com.edde746.plezy",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/861"
          },
          {
            "kind": "official-manifest",
            "url": "https://raw.githubusercontent.com/edde746/plezy/main/android/app/build.gradle.kts"
          },
          {
            "kind": "official-manifest",
            "url": "https://raw.githubusercontent.com/edde746/plezy/main/android/app/src/main/AndroidManifest.xml"
          }
        ]
      }
    },
    "incompleteFamilies": {
      "apple-tv": "No installed tvOS source or supported deep link supplied; Fire package cannot be used on tvOS."
    },
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/861",
      "https://www.amazon.com/edde746-Plezy-for-Plex-Jellyfin/dp/B0GK65CVS1/ref=sr_1_1?dib=eyJ2IjoiMSJ9.3rtWpLeBQdTMYUr8-HGhZg.i7LsLPZvjRAVhCHyo1iS6nTTf__uDrNZbtvouWh_pjg&dib_tag=se&keywords=plezy&qid=1791005815&s=mobile-apps&sr=1-1",
      "https://raw.githubusercontent.com/edde746/plezy/main/android/app/build.gradle.kts",
      "https://raw.githubusercontent.com/edde746/plezy/main/android/app/src/main/AndroidManifest.xml"
    ],
    "notes": [
      "Fire package com.edde746.plezy/MainActivity supplied. Optional comment requests Google TV and Apple TV too, but neither has working launch evidence here; keep those platforms gated."
    ],
    "displayName": "Plezy",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "com.edde746.plezy/com.edde746.plezy.MainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/861",
        "issue": 861
      },
      {
        "kind": "observed_component",
        "value": "com.edde746.plezy/.MainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/861",
        "issue": 861
      }
    ]
  },
  {
    "id": "iptv-plus",
    "aliases": [],
    "issues": [
      863
    ],
    "platforms": {
      "apple-tv": {
        "appName": "iptv",
        "launchStrategy": "source",
        "sourceAliases": [],
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/863"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/863",
      "https://apps.apple.com/us/app/iptv-smart-player-live-tv/id1525121231"
    ],
    "notes": [
      "IPTV+ product App Store id1525121231 reports exact Apple TV source lowercase iptv. Do not use product label IPTV+ as launch source or conflate other generic IPTV players."
    ],
    "displayName": "IPTV+",
    "observedEvidence": []
  },
  {
    "id": "omni-content-hub",
    "aliases": [],
    "issues": [
      734
    ],
    "platforms": {
      "apple-tv": {
        "appName": "Omni",
        "launchStrategy": "source",
        "sourceAliases": [],
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/734"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/734"
    ],
    "notes": [
      "Two apps: Omni source Omni and Proton VPN source Proton VPN. Comment 3482845655 resolves Omni identity to Omni - Content Hub, App Store id 6741470807. Do not retain the obsolete ambiguity or merge with Omni Fiber/Omni TV."
    ],
    "displayName": "Omni - Content Hub",
    "observedEvidence": []
  },
  {
    "id": "orange-tv-fr",
    "aliases": [],
    "issues": [
      777
    ],
    "platforms": {
      "apple-tv": {
        "appName": "Orange TV",
        "launchStrategy": "source",
        "sourceAliases": [],
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/777"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/777",
      "https://apps.apple.com/fr/app/free-tv/id1542614107"
    ],
    "notes": [
      "Duplicates French Free TV #761; optional comments also explicitly request Orange TV and fixes for Music/CANAL+. Sources Free TV, Orange TV, Musique, CANAL+ supplied. Orange Android preset lacks tvOS; Music fr alias already translates Music->Musique. CANAL+ remains rename regression."
    ],
    "region": "FR",
    "observedEvidence": []
  },
  {
    "id": "apple-tv-music",
    "aliases": [],
    "issues": [
      777,
      848
    ],
    "platforms": {
      "apple-tv": {
        "appName": "Music",
        "launchStrategy": "source",
        "sourceAliases": [
          "Musique",
          "Musik"
        ],
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/777"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/848"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/777",
      "https://apps.apple.com/fr/app/free-tv/id1542614107",
      "https://github.com/PRProd/HA-Firemote/issues/848"
    ],
    "notes": [
      "Duplicates French Free TV #761; optional comments also explicitly request Orange TV and fixes for Music/CANAL+. Sources Free TV, Orange TV, Musique, CANAL+ supplied. Orange Android preset lacks tvOS; Music fr alias already translates Music->Musique. CANAL+ remains rename regression.",
      "German Apple Music/Photos sources Musik and Fotos. de translation map lacks Music and Photos entries (display labels Apple Musik/Apple Bilder do not fix launch source). Need exact device-source aliases; language must follow target TV, not only HA UI language."
    ],
    "observedEvidence": []
  },
  {
    "id": "apple-tv-photos",
    "aliases": [],
    "issues": [
      848
    ],
    "platforms": {
      "apple-tv": {
        "appName": "Photos",
        "launchStrategy": "source",
        "sourceAliases": [
          "Fotos"
        ],
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/848"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/848"
    ],
    "notes": [
      "German Apple Music/Photos sources Musik and Fotos. de translation map lacks Music and Photos entries (display labels Apple Musik/Apple Bilder do not fix launch source). Need exact device-source aliases; language must follow target TV, not only HA UI language."
    ],
    "observedEvidence": []
  },
  {
    "id": "myCanal",
    "aliases": [
      "mycanal-fr",
      "mycanal"
    ],
    "issues": [
      755,
      760,
      777,
      844
    ],
    "platforms": {
      "apple-tv": {
        "appName": "CANAL+",
        "launchStrategy": "source",
        "sourceAliases": [
          "myCANAL"
        ],
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/755"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/760"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/777"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/844"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/755",
      "https://apps.apple.com/us/app/canal/id694580816?platform=tv",
      "https://github.com/PRProd/HA-Firemote/issues/760",
      "https://apps.apple.com/fr/app/canal/id694580816",
      "https://github.com/PRProd/HA-Firemote/issues/777",
      "https://apps.apple.com/fr/app/free-tv/id1542614107",
      "https://github.com/PRProd/HA-Firemote/issues/844",
      "https://apps.apple.com/fr/app/canal/id694580816?platform=tv"
    ],
    "notes": [
      "French tvOS CANAL+ source replaces myCANAL; duplicate family #760/#844. Existing canal-plus preset is a different Android/Solocoo product and does not support tvOS. Preserve myCanal key and do not copy Android package.",
      "Same French CANAL+ tvOS rename as #755/#844, source CANAL+; not the unrelated Solocoo Android CANAL+ app.",
      "Duplicates French Free TV #761; optional comments also explicitly request Orange TV and fixes for Music/CANAL+. Sources Free TV, Orange TV, Musique, CANAL+ supplied. Orange Android preset lacks tvOS; Music fr alias already translates Music->Musique. CANAL+ remains rename regression.",
      "Same French tvOS myCANAL->CANAL+ source rename as #755/#760. Separate from Android/Solocoo CANAL+."
    ],
    "displayName": "CANAL+ (FR)",
    "region": "FR",
    "observedEvidence": [],
    "typographicArtwork": true
  },
  {
    "id": "swiftfin",
    "aliases": [],
    "issues": [
      851
    ],
    "platforms": {
      "apple-tv": {
        "appName": "Swiftfin tvOS",
        "launchStrategy": "source",
        "sourceAliases": [
          "Jellyfin"
        ],
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/851"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/851"
    ],
    "notes": [
      "Local swiftfin apple-tv appName is Jellyfin. Requester explicitly tested Swiftfin v1.6.1 / Apple TV A2737 with source Swiftfin tvOS and confirmed launch after changing it. Preserve old Jellyfin alias for older builds if source is installed."
    ],
    "observedEvidence": []
  },
  {
    "id": "my5",
    "aliases": [],
    "issues": [
      422,
      730
    ],
    "platforms": {
      "roku": {
        "appName": "5",
        "launchStrategy": "source",
        "sourceAliases": [
          "My5"
        ],
        "app-id": 27424,
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/422"
          }
        ]
      },
      "apple-tv": {
        "appName": "Channel 5",
        "launchStrategy": "source",
        "sourceAliases": [
          "My5"
        ],
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/730"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/422",
      "https://github.com/PRProd/HA-Firemote/issues/730"
    ],
    "notes": [
      "Preset exists but REPAIR IS REQUIRED. Local my5 still selects My5; latest requester dump gives app_id 27424, app_name/source 5. Requester explicitly reports failure. Retain my5 YAML key and channel ID, repair Roku source alias/branding; Apple Channel 5 is a different platform source name.",
      "My5 -> Channel 5 on Apple TV: exact new source Channel 5 supplied; maintainer requested logo/store confirmation and requester confirmed in comment 3429686374. Update display branding/alias while preserving my5 YAML key; test old/new installed names."
    ],
    "displayName": "Channel 5 / 5 (formerly My5)",
    "observedEvidence": [
      {
        "kind": "app_id",
        "value": "27424",
        "source": "https://github.com/PRProd/HA-Firemote/issues/422",
        "issue": 422
      },
      {
        "kind": "app_name",
        "value": "My5",
        "source": "https://github.com/PRProd/HA-Firemote/issues/422",
        "issue": 422
      },
      {
        "kind": "source",
        "value": "My5",
        "source": "https://github.com/PRProd/HA-Firemote/issues/422",
        "issue": 422
      },
      {
        "kind": "app_id",
        "value": "27424",
        "source": "https://github.com/PRProd/HA-Firemote/issues/422#issuecomment-3446582099",
        "issue": 422
      },
      {
        "kind": "app_name",
        "value": "5",
        "source": "https://github.com/PRProd/HA-Firemote/issues/422#issuecomment-3446582099",
        "issue": 422
      },
      {
        "kind": "source",
        "value": "5",
        "source": "https://github.com/PRProd/HA-Firemote/issues/422#issuecomment-3446582099",
        "issue": 422
      }
    ],
    "typographicArtwork": true
  },
  {
    "id": "uktv-play",
    "aliases": [],
    "issues": [
      423
    ],
    "platforms": {
      "roku": {
        "appName": "U",
        "launchStrategy": "source",
        "sourceAliases": [
          "UKTV Play"
        ],
        "app-id": 181173,
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/423"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/423"
    ],
    "notes": [
      "Preset exists but REPAIR IS REQUIRED. Local uktv-play still selects UKTV Play; latest requester dump gives app_id 181173, app_name/source U. Thread was reopened because renamed app no longer opens. Retain uktv-play YAML key and channel ID; repair source alias/branding without adding a duplicate."
    ],
    "displayName": "U (formerly UKTV Play)",
    "observedEvidence": [
      {
        "kind": "app_id",
        "value": "181173",
        "source": "https://github.com/PRProd/HA-Firemote/issues/423",
        "issue": 423
      },
      {
        "kind": "app_name",
        "value": "UKTV Play",
        "source": "https://github.com/PRProd/HA-Firemote/issues/423",
        "issue": 423
      },
      {
        "kind": "source",
        "value": "UKTV Play",
        "source": "https://github.com/PRProd/HA-Firemote/issues/423",
        "issue": 423
      },
      {
        "kind": "app_id",
        "value": "181173",
        "source": "https://github.com/PRProd/HA-Firemote/issues/423#issuecomment-3446584933",
        "issue": 423
      },
      {
        "kind": "app_name",
        "value": "U",
        "source": "https://github.com/PRProd/HA-Firemote/issues/423#issuecomment-3446584933",
        "issue": 423
      },
      {
        "kind": "source",
        "value": "U",
        "source": "https://github.com/PRProd/HA-Firemote/issues/423#issuecomment-3446584933",
        "issue": 423
      }
    ],
    "typographicArtwork": true
  },
  {
    "id": "max",
    "aliases": [],
    "issues": [
      748,
      793,
      836
    ],
    "platforms": {
      "roku": {
        "appName": "HBO Max",
        "launchStrategy": "source",
        "sourceAliases": [
          "Max"
        ],
        "app-id": 61322,
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/748"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/793"
          }
        ]
      },
      "apple-tv": {
        "appName": "HBO Max",
        "launchStrategy": "source",
        "sourceAliases": [
          "Max"
        ],
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/748"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/748",
      "https://github.com/PRProd/HA-Firemote/issues/793",
      "https://github.com/PRProd/HA-Firemote/issues/836"
    ],
    "notes": [
      "Max -> HBO Max. Body reports Roku and Amazon TV; comments add US Apple TV and successful hbo-max Denmark/Netherlands workaround in US. Roku max keeps channel 61322 but old source Max; preserve ID and region/build variants rather than deleting one globally.",
      "Roku HBO Max channel 61322 already exists in max under source Max. Name changed to HBO Max; prefer confirmed ID during modernization and preserve old YAML key.",
      "Several Apple TV 4K users report formerly working launchers fail on HA 2026.6.3/v4.1.9. Cross-app pattern warrants direct select_source/integration diagnostics before editing every preset."
    ],
    "displayName": "HBO Max (formerly Max)",
    "observedEvidence": [
      {
        "kind": "app_id",
        "value": "61322",
        "source": "https://github.com/PRProd/HA-Firemote/issues/793",
        "issue": 793
      },
      {
        "kind": "app_name",
        "value": "HBO Max",
        "source": "https://github.com/PRProd/HA-Firemote/issues/793",
        "issue": 793
      },
      {
        "kind": "source",
        "value": "HBO Max",
        "source": "https://github.com/PRProd/HA-Firemote/issues/793",
        "issue": 793
      }
    ],
    "typographicArtwork": true
  },
  {
    "id": "hbo-max",
    "aliases": [],
    "issues": [
      748,
      793,
      836
    ],
    "platforms": {},
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/748",
      "https://github.com/PRProd/HA-Firemote/issues/793",
      "https://github.com/PRProd/HA-Firemote/issues/836"
    ],
    "notes": [
      "Max -> HBO Max. Body reports Roku and Amazon TV; comments add US Apple TV and successful hbo-max Denmark/Netherlands workaround in US. Roku max keeps channel 61322 but old source Max; preserve ID and region/build variants rather than deleting one globally.",
      "Roku HBO Max channel 61322 already exists in max under source Max. Name changed to HBO Max; prefer confirmed ID during modernization and preserve old YAML key.",
      "Several Apple TV 4K users report formerly working launchers fail on HA 2026.6.3/v4.1.9. Cross-app pattern warrants direct select_source/integration diagnostics before editing every preset."
    ],
    "observedEvidence": [
      {
        "kind": "app_id",
        "value": "61322",
        "source": "https://github.com/PRProd/HA-Firemote/issues/793",
        "issue": 793
      },
      {
        "kind": "app_name",
        "value": "HBO Max",
        "source": "https://github.com/PRProd/HA-Firemote/issues/793",
        "issue": 793
      },
      {
        "kind": "source",
        "value": "HBO Max",
        "source": "https://github.com/PRProd/HA-Firemote/issues/793",
        "issue": 793
      }
    ]
  },
  {
    "id": "smart-tube-next",
    "aliases": [],
    "issues": [
      767,
      812,
      856
    ],
    "platforms": {
      "amazon-fire": {
        "appName": "org.smarttube.stable",
        "androidName": "org.smarttube.stable",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/767"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/812"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/856"
          }
        ]
      },
      "chromecast": {
        "appName": "org.smarttube.stable",
        "androidName": "org.smarttube.stable",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/767"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/812"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/856"
          }
        ]
      },
      "homatics": {
        "appName": "org.smarttube.stable",
        "androidName": "org.smarttube.stable",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/767"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/812"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/856"
          }
        ]
      },
      "nvidia-shield": {
        "appName": "org.smarttube.stable",
        "androidName": "org.smarttube.stable",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/767"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/812"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/856"
          }
        ]
      },
      "onn": {
        "appName": "org.smarttube.stable",
        "androidName": "org.smarttube.stable",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/767"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/812"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/856"
          }
        ]
      },
      "xiaomi": {
        "appName": "org.smarttube.stable",
        "androidName": "org.smarttube.stable",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/767"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/812"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/856"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/767",
      "https://github.com/yuliskov/SmartTube",
      "https://github.com/PRProd/HA-Firemote/issues/812",
      "https://github.com/PRProd/HA-Firemote/issues/856"
    ],
    "notes": [
      "Both SmartTube stable/beta packages changed to org.smarttube.stable and org.smarttube.beta. Body observes Beta BrowseActivity, not a verified cold-launch activity. #856 supplies tested Fire Beta SplashActivity; test Chromecast separately.",
      "Closed with no comments, but request supplies new org.smarttube.stable package. Local still uses com.teamsmart.videomanager.tv. Related open #767/#856; closure did not implement current package.",
      "Reporter explicitly tested Fire Beta v32.56: org.smarttube.beta/com.liskovsoft.smartyoutubetv2.tv.ui.main.SplashActivity works via HA and native button after edit. Stable package org.smarttube.stable supplied but no successful stable launch test; retain legacy package variants."
    ],
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "org.smarttube.beta/com.liskovsoft.smartyoutubetv2.tv.ui.browse.BrowseActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/767",
        "issue": 767
      },
      {
        "kind": "observed_component",
        "value": "org.smarttube.stable/com.liskovsoft.smartyoutubetv2.tv.ui.browse.BrowseActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/812",
        "issue": 812
      },
      {
        "kind": "observed_component",
        "value": "org.smarttube.beta/com.liskovsoft.smartyoutubetv2.tv.ui.main.SplashActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/856",
        "issue": 856
      }
    ]
  },
  {
    "id": "smart-tube-next-legacy",
    "aliases": [],
    "issues": [
      767,
      812,
      856
    ],
    "platforms": {
      "amazon-fire": {
        "appName": "com.teamsmart.videomanager.tv",
        "androidName": "com.teamsmart.videomanager.tv",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/767"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/812"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/856"
          }
        ]
      },
      "chromecast": {
        "appName": "com.teamsmart.videomanager.tv",
        "androidName": "com.teamsmart.videomanager.tv",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/767"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/812"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/856"
          }
        ]
      },
      "homatics": {
        "appName": "com.teamsmart.videomanager.tv",
        "androidName": "com.teamsmart.videomanager.tv",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/767"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/812"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/856"
          }
        ]
      },
      "nvidia-shield": {
        "appName": "com.teamsmart.videomanager.tv",
        "androidName": "com.teamsmart.videomanager.tv",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/767"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/812"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/856"
          }
        ]
      },
      "onn": {
        "appName": "com.teamsmart.videomanager.tv",
        "androidName": "com.teamsmart.videomanager.tv",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/767"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/812"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/856"
          }
        ]
      },
      "xiaomi": {
        "appName": "com.teamsmart.videomanager.tv",
        "androidName": "com.teamsmart.videomanager.tv",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/767"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/812"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/856"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/767",
      "https://github.com/yuliskov/SmartTube",
      "https://github.com/PRProd/HA-Firemote/issues/812",
      "https://github.com/PRProd/HA-Firemote/issues/856"
    ],
    "notes": [
      "Both SmartTube stable/beta packages changed to org.smarttube.stable and org.smarttube.beta. Body observes Beta BrowseActivity, not a verified cold-launch activity. #856 supplies tested Fire Beta SplashActivity; test Chromecast separately.",
      "Closed with no comments, but request supplies new org.smarttube.stable package. Local still uses com.teamsmart.videomanager.tv. Related open #767/#856; closure did not implement current package.",
      "Reporter explicitly tested Fire Beta v32.56: org.smarttube.beta/com.liskovsoft.smartyoutubetv2.tv.ui.main.SplashActivity works via HA and native button after edit. Stable package org.smarttube.stable supplied but no successful stable launch test; retain legacy package variants.",
      "Explicit legacy package choice. Never substitute the old installation automatically."
    ],
    "displayName": "SmartTube (legacy package)",
    "lifecycle": "legacy",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "org.smarttube.beta/com.liskovsoft.smartyoutubetv2.tv.ui.browse.BrowseActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/767",
        "issue": 767
      },
      {
        "kind": "observed_component",
        "value": "org.smarttube.stable/com.liskovsoft.smartyoutubetv2.tv.ui.browse.BrowseActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/812",
        "issue": 812
      },
      {
        "kind": "observed_component",
        "value": "org.smarttube.beta/com.liskovsoft.smartyoutubetv2.tv.ui.main.SplashActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/856",
        "issue": 856
      }
    ]
  },
  {
    "id": "smart-tube-next-beta",
    "aliases": [],
    "issues": [
      767,
      856
    ],
    "platforms": {
      "amazon-fire": {
        "appName": "org.smarttube.beta",
        "androidName": "org.smarttube.beta",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/767"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/856"
          }
        ]
      },
      "chromecast": {
        "appName": "org.smarttube.beta",
        "androidName": "org.smarttube.beta",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/767"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/856"
          }
        ]
      },
      "homatics": {
        "appName": "org.smarttube.beta",
        "androidName": "org.smarttube.beta",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/767"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/856"
          }
        ]
      },
      "nvidia-shield": {
        "appName": "org.smarttube.beta",
        "androidName": "org.smarttube.beta",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/767"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/856"
          }
        ]
      },
      "onn": {
        "appName": "org.smarttube.beta",
        "androidName": "org.smarttube.beta",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/767"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/856"
          }
        ]
      },
      "xiaomi": {
        "appName": "org.smarttube.beta",
        "androidName": "org.smarttube.beta",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/767"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/856"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/767",
      "https://github.com/yuliskov/SmartTube",
      "https://github.com/PRProd/HA-Firemote/issues/856"
    ],
    "notes": [
      "Both SmartTube stable/beta packages changed to org.smarttube.stable and org.smarttube.beta. Body observes Beta BrowseActivity, not a verified cold-launch activity. #856 supplies tested Fire Beta SplashActivity; test Chromecast separately.",
      "Reporter explicitly tested Fire Beta v32.56: org.smarttube.beta/com.liskovsoft.smartyoutubetv2.tv.ui.main.SplashActivity works via HA and native button after edit. Stable package org.smarttube.stable supplied but no successful stable launch test; retain legacy package variants."
    ],
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "org.smarttube.beta/com.liskovsoft.smartyoutubetv2.tv.ui.browse.BrowseActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/767",
        "issue": 767
      },
      {
        "kind": "observed_component",
        "value": "org.smarttube.beta/com.liskovsoft.smartyoutubetv2.tv.ui.main.SplashActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/856",
        "issue": 856
      }
    ]
  },
  {
    "id": "smart-tube-next-beta-legacy",
    "aliases": [],
    "issues": [
      767,
      856
    ],
    "platforms": {
      "amazon-fire": {
        "appName": "com.liskovsoft.smarttubetv.beta",
        "androidName": "com.liskovsoft.smarttubetv.beta",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/767"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/856"
          }
        ]
      },
      "chromecast": {
        "appName": "com.liskovsoft.smarttubetv.beta",
        "androidName": "com.liskovsoft.smarttubetv.beta",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/767"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/856"
          }
        ]
      },
      "homatics": {
        "appName": "com.liskovsoft.smarttubetv.beta",
        "androidName": "com.liskovsoft.smarttubetv.beta",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/767"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/856"
          }
        ]
      },
      "nvidia-shield": {
        "appName": "com.liskovsoft.smarttubetv.beta",
        "androidName": "com.liskovsoft.smarttubetv.beta",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/767"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/856"
          }
        ]
      },
      "onn": {
        "appName": "com.liskovsoft.smarttubetv.beta",
        "androidName": "com.liskovsoft.smarttubetv.beta",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/767"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/856"
          }
        ]
      },
      "xiaomi": {
        "appName": "com.liskovsoft.smarttubetv.beta",
        "androidName": "com.liskovsoft.smarttubetv.beta",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/767"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/856"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/767",
      "https://github.com/yuliskov/SmartTube",
      "https://github.com/PRProd/HA-Firemote/issues/856"
    ],
    "notes": [
      "Both SmartTube stable/beta packages changed to org.smarttube.stable and org.smarttube.beta. Body observes Beta BrowseActivity, not a verified cold-launch activity. #856 supplies tested Fire Beta SplashActivity; test Chromecast separately.",
      "Reporter explicitly tested Fire Beta v32.56: org.smarttube.beta/com.liskovsoft.smartyoutubetv2.tv.ui.main.SplashActivity works via HA and native button after edit. Stable package org.smarttube.stable supplied but no successful stable launch test; retain legacy package variants.",
      "Explicit legacy package choice. Never substitute the old installation automatically."
    ],
    "displayName": "SmartTube Beta (legacy package)",
    "lifecycle": "legacy",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "org.smarttube.beta/com.liskovsoft.smartyoutubetv2.tv.ui.browse.BrowseActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/767",
        "issue": 767
      },
      {
        "kind": "observed_component",
        "value": "org.smarttube.beta/com.liskovsoft.smartyoutubetv2.tv.ui.main.SplashActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/856",
        "issue": 856
      }
    ]
  },
  {
    "id": "plex",
    "aliases": [],
    "issues": [
      672,
      836,
      547
    ],
    "platforms": {
      "amazon-fire": {
        "appName": "com.plexapp.android",
        "androidName": "com.plexapp.android",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/672"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/836"
          }
        ]
      },
      "chromecast": {
        "appName": "com.plexapp.android",
        "androidName": "com.plexapp.android",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/672"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/836"
          }
        ]
      },
      "homatics": {
        "appName": "com.plexapp.android",
        "androidName": "com.plexapp.android",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/672"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/836"
          }
        ]
      },
      "nvidia-shield": {
        "appName": "com.plexapp.android",
        "androidName": "com.plexapp.android",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/672"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/836"
          }
        ]
      },
      "onn": {
        "appName": "com.plexapp.android",
        "androidName": "com.plexapp.android",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/672"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/836"
          }
        ]
      },
      "xiaomi": {
        "appName": "com.plexapp.android",
        "androidName": "com.plexapp.android",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/672"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/836"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/672",
      "https://github.com/PRProd/HA-Firemote/issues/836",
      "https://github.com/PRProd/HA-Firemote/issues/547"
    ],
    "notes": [
      "Sony XH9505 Android TV fails to launch Plex while Shield with same setup works, and active-app highlighting works. Preset exists; verify actual Sony transport/entity and direct HA source action, rather than changing global Plex ID.",
      "Several Apple TV 4K users report formerly working launchers fail on HA 2026.6.3/v4.1.9. Cross-app pattern warrants direct select_source/integration diagnostics before editing every preset.",
      "device_family none on RPi LineageOS does not select family-specific launch data. Generic top-level GO PLAY works while family-specific others get undefined source. Existing presets are present; document custom launchers or supported family/transport configuration."
    ],
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "be.goplay.app.tv/be.goplay.app.ui.consent.ConsentActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/547#issuecomment-2457783562",
        "issue": 547
      },
      {
        "kind": "source",
        "value": "be.vmma.vtm.zenderapp",
        "source": "https://github.com/PRProd/HA-Firemote/issues/547#issuecomment-2457783562",
        "issue": 547
      }
    ]
  },
  {
    "id": "twitch",
    "aliases": [],
    "issues": [
      815
    ],
    "platforms": {
      "amazon-fire": {
        "appName": "tv.twitch.android.viewer",
        "androidName": "tv.twitch.android.viewer",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/815"
          }
        ]
      },
      "chromecast": {
        "appName": "tv.twitch.android.app",
        "androidName": "tv.twitch.android.app",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/815"
          }
        ]
      },
      "homatics": {
        "appName": "tv.twitch.android.app",
        "androidName": "tv.twitch.android.app",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/815"
          }
        ]
      },
      "nvidia-shield": {
        "appName": "tv.twitch.android.app",
        "androidName": "tv.twitch.android.app",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/815"
          }
        ]
      },
      "onn": {
        "appName": "tv.twitch.android.app",
        "androidName": "tv.twitch.android.app",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/815"
          }
        ]
      },
      "xiaomi": {
        "appName": "tv.twitch.android.app",
        "androidName": "tv.twitch.android.app",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/815"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/815",
      "https://play.google.com/store/search?q=twitch&c=apps"
    ],
    "notes": [
      "Chromecast already has Twitch with androidName tv.twitch.android.app. Family entry has appName, so handler uses select_source(Twitch), not root Fire-specific adbLaunchCommand. Request supplies tv.twitch.android.app/tv.twitch.starshot64.app.StarshotActivity; validate family-specific explicit launch/fallback."
    ],
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "tv.twitch.android.app/tv.twitch.starshot64.app.StarshotActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/815",
        "issue": 815
      }
    ]
  },
  {
    "id": "discovery-plus",
    "aliases": [],
    "issues": [
      559,
      782
    ],
    "platforms": {
      "amazon-fire": {
        "appName": "com.discovery.discoveryplus.firetv",
        "androidName": "com.discovery.discoveryplus.firetv",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/559"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/782"
          }
        ]
      },
      "chromecast": {
        "appName": "com.discovery.discoveryplus.androidtv",
        "androidName": "com.discovery.discoveryplus.androidtv",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/559"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/782"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/559",
      "https://github.com/PRProd/HA-Firemote/issues/782"
    ],
    "notes": [
      "NOW and Discovery+ Fire Stick Lite launch failures; existing presets, no new verified working identifier in this thread. Keep UK NOW, NOW Italy and Discovery+ alt separate.",
      "Comment 6111285689 reports working BBC bbc.iplayer.android/external.androidtv.psbwrapper.deeplinking.DeepLinkActivity replacing bbciplayer path, and NOW com.bskyb.nowtv.beta/com.peacock.peacocktv.GoogleMainActivity (v7.10.200). NOW has no Chromecast family. Discovery+ URL https://play.discoveryplus.com/ is only suggested, not confirmed as working app deep link."
    ],
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "com.nowtv.it/sky.wrapper.tv.AmazonMainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/559#issuecomment-2525552201",
        "issue": 559
      },
      {
        "kind": "observed_component",
        "value": "com.discovery.discoplus/com.discovery.luna.tv.presentation.LunaMainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/559#issuecomment-2525552201",
        "issue": 559
      },
      {
        "kind": "observed_component",
        "value": "com.discovery.discoplus/com.discovery.luna.tv.presentation.LunaMainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/559#issuecomment-2558142993",
        "issue": 559
      },
      {
        "kind": "observed_component",
        "value": "bbc.iplayer.android/external.androidtv.bbciplayer.deeplinking.DeepLinkActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/782#issuecomment-6111285689",
        "issue": 782
      },
      {
        "kind": "observed_component",
        "value": "bbc.iplayer.android/external.androidtv.psbwrapper.deeplinking.DeepLinkActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/782#issuecomment-6111285689",
        "issue": 782
      },
      {
        "kind": "observed_component",
        "value": "com.bskyb.nowtv.beta/com.peacock.peacocktv.GoogleMainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/782#issuecomment-6111285689",
        "issue": 782
      }
    ]
  },
  {
    "id": "all-4",
    "aliases": [],
    "issues": [
      828
    ],
    "platforms": {
      "amazon-fire": {
        "appName": "com.channel4.ondemand",
        "androidName": "com.channel4.ondemand",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/828"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/828",
      "https://www.amazon.com/Channel-4-TV-All/dp/B00BHDIS12,",
      "https://www.amazon.com/BBC-iPlayer/dp/B00OP4CQE0,"
    ],
    "notes": [
      "Fire existing all-4 and bbc-iplayer entries fail. Current Channel 4 surface com.channel4.ondemand/com.channel4.ondemand.Channel4Activity supplied; BBC uk.co.bbc.iplayer/uk.co.bbc.MainActivity supplied. Compare each to local family dispatch and validate cold launch; keep All4 YAML alias."
    ],
    "displayName": "Channel 4 (legacy All4 ID)",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "com.channel4.ondemand/com.channel4.ondemand.Channel4Activity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/828",
        "issue": 828
      },
      {
        "kind": "observed_component",
        "value": "uk.co.bbc.iplayer/uk.co.bbc.MainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/828",
        "issue": 828
      }
    ],
    "typographicArtwork": true
  },
  {
    "id": "bbc-iplayer",
    "aliases": [],
    "issues": [
      782,
      828
    ],
    "platforms": {
      "chromecast": {
        "appName": "bbc.iplayer.android",
        "androidName": "bbc.iplayer.android",
        "launchStrategy": "command",
        "adbLaunchCommand": "adb shell am start -n bbc.iplayer.android/external.androidtv.psbwrapper.deeplinking.DeepLinkActivity",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/782"
          }
        ]
      },
      "amazon-fire": {
        "appName": "uk.co.bbc.iplayer",
        "androidName": "uk.co.bbc.iplayer",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/828"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/782",
      "https://github.com/PRProd/HA-Firemote/issues/828",
      "https://www.amazon.com/Channel-4-TV-All/dp/B00BHDIS12,",
      "https://www.amazon.com/BBC-iPlayer/dp/B00OP4CQE0,"
    ],
    "notes": [
      "Comment 6111285689 reports working BBC bbc.iplayer.android/external.androidtv.psbwrapper.deeplinking.DeepLinkActivity replacing bbciplayer path, and NOW com.bskyb.nowtv.beta/com.peacock.peacocktv.GoogleMainActivity (v7.10.200). NOW has no Chromecast family. Discovery+ URL https://play.discoveryplus.com/ is only suggested, not confirmed as working app deep link.",
      "Fire existing all-4 and bbc-iplayer entries fail. Current Channel 4 surface com.channel4.ondemand/com.channel4.ondemand.Channel4Activity supplied; BBC uk.co.bbc.iplayer/uk.co.bbc.MainActivity supplied. Compare each to local family dispatch and validate cold launch; keep All4 YAML alias."
    ],
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "bbc.iplayer.android/external.androidtv.bbciplayer.deeplinking.DeepLinkActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/782#issuecomment-6111285689",
        "issue": 782
      },
      {
        "kind": "observed_component",
        "value": "bbc.iplayer.android/external.androidtv.psbwrapper.deeplinking.DeepLinkActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/782#issuecomment-6111285689",
        "issue": 782
      },
      {
        "kind": "observed_component",
        "value": "com.bskyb.nowtv.beta/com.peacock.peacocktv.GoogleMainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/782#issuecomment-6111285689",
        "issue": 782
      },
      {
        "kind": "observed_component",
        "value": "com.channel4.ondemand/com.channel4.ondemand.Channel4Activity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/828",
        "issue": 828
      },
      {
        "kind": "observed_component",
        "value": "uk.co.bbc.iplayer/uk.co.bbc.MainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/828",
        "issue": 828
      }
    ]
  },
  {
    "id": "kayo",
    "aliases": [],
    "issues": [
      759
    ],
    "platforms": {
      "amazon-fire": {
        "appName": "au.com.streamotion.ctv.kayo",
        "androidName": "au.com.streamotion.ctv.kayo",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/759"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/759",
      "https://www.amazon.com.au/dp/B09XB4XWXM"
    ],
    "notes": [
      "Official Fire Kayo changed to au.com.streamotion.ctv.kayo/au.com.streamotion.ctv.MainActivity. Old au.com.kayosports.tv/...MainActivity explicitly returns Error type 3. Preserve legacy/other-platform builds; new foreground component still requires direct cold-launch confirmation."
    ],
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "au.com.streamotion.ctv.kayo/au.com.streamotion.ctv.MainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/759",
        "issue": 759
      },
      {
        "kind": "observed_component",
        "value": "au.com.kayosports.tv/au.com.foxsports.martian.tv.main.MainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/759",
        "issue": 759
      }
    ]
  },
  {
    "id": "kayo-fire-legacy",
    "aliases": [],
    "issues": [
      759
    ],
    "platforms": {
      "amazon-fire": {
        "appName": "au.com.kayosports.tv",
        "androidName": "au.com.kayosports.tv",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/759"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/759",
      "https://www.amazon.com.au/dp/B09XB4XWXM"
    ],
    "notes": [
      "Official Fire Kayo changed to au.com.streamotion.ctv.kayo/au.com.streamotion.ctv.MainActivity. Old au.com.kayosports.tv/...MainActivity explicitly returns Error type 3. Preserve legacy/other-platform builds; new foreground component still requires direct cold-launch confirmation."
    ],
    "displayName": "Kayo (legacy Fire package)",
    "lifecycle": "legacy",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "au.com.streamotion.ctv.kayo/au.com.streamotion.ctv.MainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/759",
        "issue": 759
      },
      {
        "kind": "observed_component",
        "value": "au.com.kayosports.tv/au.com.foxsports.martian.tv.main.MainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/759",
        "issue": 759
      }
    ]
  },
  {
    "id": "joyn-at",
    "aliases": [],
    "issues": [
      689
    ],
    "platforms": {
      "amazon-fire": {
        "appName": "com.zappntv",
        "androidName": "com.zappntv",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/689"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/689"
    ],
    "notes": [
      "Existing Fire joyn shortcut fails; device reports package com.zappntv (former name), whereas local entry must be compared for region/build variant. No successful replacement launch is provided."
    ],
    "displayName": "Joyn (AT / former Zappn)",
    "region": "AT",
    "observedEvidence": []
  },
  {
    "id": "joyn",
    "aliases": [],
    "issues": [
      689
    ],
    "platforms": {},
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/689"
    ],
    "notes": [
      "Existing Fire joyn shortcut fails; device reports package com.zappntv (former name), whereas local entry must be compared for region/build variant. No successful replacement launch is provided."
    ],
    "observedEvidence": []
  },
  {
    "id": "meo-go",
    "aliases": [],
    "issues": [
      747
    ],
    "platforms": {},
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/747"
    ],
    "notes": [
      "Shield request explicitly says visual-only: change display name/logo/background from MEO Go to MEO, retaining meo-go key and launch semantics."
    ],
    "displayName": "MEO",
    "observedEvidence": [],
    "typographicArtwork": true
  },
  {
    "id": "go-play",
    "aliases": [],
    "issues": [
      757,
      547
    ],
    "platforms": {},
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/757",
      "https://github.com/PRProd/HA-Firemote/issues/547"
    ],
    "notes": [
      "Belgian GO PLAY -> Play; current go-play uses be.goplay.app.tv / ConsentActivity, request supplies be.goplay.app in store field. New name/logo requested; verify installed TV package and launch action before changing package.",
      "device_family none on RPi LineageOS does not select family-specific launch data. Generic top-level GO PLAY works while family-specific others get undefined source. Existing presets are present; document custom launchers or supported family/transport configuration."
    ],
    "displayName": "Play (BE)",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "be.goplay.app.tv/be.goplay.app.ui.consent.ConsentActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/547#issuecomment-2457783562",
        "issue": 547
      },
      {
        "kind": "source",
        "value": "be.vmma.vtm.zenderapp",
        "source": "https://github.com/PRProd/HA-Firemote/issues/547#issuecomment-2457783562",
        "issue": 547
      }
    ],
    "typographicArtwork": true
  },
  {
    "id": "xfinityStream",
    "aliases": [],
    "issues": [
      538
    ],
    "platforms": {},
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/538"
    ],
    "notes": [
      "The NVIDIA Shield xfinityStream entry already uses com.xfinity.cloudtvr, matching this modded build. It intentionally differs from Fire/Homatics tenfoot packages. Reproduce select_source before adding any duplicate."
    ],
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "com.xfinity.cloudtvr/com.xfinity.cloudtvr.view.BrowseActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/538",
        "issue": 538
      },
      {
        "kind": "app_name",
        "value": "com.xfinity.cloudtvr",
        "source": "https://github.com/PRProd/HA-Firemote/issues/538",
        "issue": 538
      },
      {
        "kind": "source",
        "value": "com.xfinity.cloudtvr",
        "source": "https://github.com/PRProd/HA-Firemote/issues/538",
        "issue": 538
      },
      {
        "kind": "observed_component",
        "value": "com.xfinity.cloudtvr/com.xfinity.common.view.LaunchActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/538#issuecomment-2544525888",
        "issue": 538
      }
    ]
  },
  {
    "id": "hulu",
    "aliases": [],
    "issues": [
      728
    ],
    "platforms": {},
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/728"
    ],
    "notes": [
      "Hulu Fire entry has appName Hulu and androidName com.hulu.plus, with no adbLaunchCommand. Maintainer says select_source works in lab and disputes the claimed built-in livingroomplus command. Reporter offers com.hulu.plus/.SplashActivity; reproduce actual card failure before replacing working fallback."
    ],
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "com.hulu.livingroomplus/.WKFactivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/728",
        "issue": 728
      },
      {
        "kind": "observed_component",
        "value": "com.hulu.plus/.SplashActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/728",
        "issue": 728
      }
    ]
  },
  {
    "id": "unifi-protect",
    "aliases": [],
    "issues": [
      736
    ],
    "platforms": {},
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/736"
    ],
    "notes": [
      "unifi-protect already sends Apple TV source Protect. Maintainer retested successfully and asks to reload Apple TV integration / provide current sources. No replacement source confirmed."
    ],
    "observedEvidence": []
  },
  {
    "id": "zdf-mediathek",
    "aliases": [],
    "issues": [
      778
    ],
    "platforms": {},
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/778"
    ],
    "notes": [
      "Existing Fire zdf-mediathek does not launch on Fire Stick 4K Max; no new working component supplied. Collect direct HA action/error and installed app metadata."
    ],
    "observedEvidence": []
  },
  {
    "id": "red-bull-tv",
    "aliases": [],
    "issues": [
      780
    ],
    "platforms": {},
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/780"
    ],
    "notes": [
      "Existing Fire red-bull-tv fails on new Fire Stick 4K Max. Renaming YAML key to rbtv is not launch evidence; capture current package/activity and direct action outcome."
    ],
    "observedEvidence": []
  },
  {
    "id": "dropout",
    "aliases": [],
    "issues": [
      814
    ],
    "platforms": {},
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/814"
    ],
    "notes": [
      "dropout already supports Apple TV. Reporter tried several names without success, but supplies no current source_list or successful direct HA action. Reproduce before guessing source replacement."
    ],
    "observedEvidence": []
  },
  {
    "id": "netflix",
    "aliases": [],
    "issues": [
      823
    ],
    "platforms": {},
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/823"
    ],
    "notes": [
      "Unlabeled generic-title issue: two Apple TVs previously launched apps, now Netflix and other launcher buttons do nothing. Same cross-app pattern as #836; reproduce direct media_player.select_source before replacing preset IDs."
    ],
    "observedEvidence": []
  },
  {
    "id": "vtm-go",
    "aliases": [],
    "issues": [
      547
    ],
    "platforms": {},
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/547"
    ],
    "notes": [
      "device_family none on RPi LineageOS does not select family-specific launch data. Generic top-level GO PLAY works while family-specific others get undefined source. Existing presets are present; document custom launchers or supported family/transport configuration."
    ],
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "be.goplay.app.tv/be.goplay.app.ui.consent.ConsentActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/547#issuecomment-2457783562",
        "issue": 547
      },
      {
        "kind": "source",
        "value": "be.vmma.vtm.zenderapp",
        "source": "https://github.com/PRProd/HA-Firemote/issues/547#issuecomment-2457783562",
        "issue": 547
      }
    ]
  },
  {
    "id": "kodi",
    "aliases": [],
    "issues": [
      547
    ],
    "platforms": {},
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/547"
    ],
    "notes": [
      "device_family none on RPi LineageOS does not select family-specific launch data. Generic top-level GO PLAY works while family-specific others get undefined source. Existing presets are present; document custom launchers or supported family/transport configuration."
    ],
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "be.goplay.app.tv/be.goplay.app.ui.consent.ConsentActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/547#issuecomment-2457783562",
        "issue": 547
      },
      {
        "kind": "source",
        "value": "be.vmma.vtm.zenderapp",
        "source": "https://github.com/PRProd/HA-Firemote/issues/547#issuecomment-2457783562",
        "issue": 547
      }
    ]
  },
  {
    "id": "spotify",
    "aliases": [],
    "issues": [
      547
    ],
    "platforms": {},
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/547"
    ],
    "notes": [
      "device_family none on RPi LineageOS does not select family-specific launch data. Generic top-level GO PLAY works while family-specific others get undefined source. Existing presets are present; document custom launchers or supported family/transport configuration."
    ],
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "be.goplay.app.tv/be.goplay.app.ui.consent.ConsentActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/547#issuecomment-2457783562",
        "issue": 547
      },
      {
        "kind": "source",
        "value": "be.vmma.vtm.zenderapp",
        "source": "https://github.com/PRProd/HA-Firemote/issues/547#issuecomment-2457783562",
        "issue": 547
      }
    ]
  },
  {
    "id": "vrt-max",
    "aliases": [],
    "issues": [
      547
    ],
    "platforms": {},
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/547"
    ],
    "notes": [
      "device_family none on RPi LineageOS does not select family-specific launch data. Generic top-level GO PLAY works while family-specific others get undefined source. Existing presets are present; document custom launchers or supported family/transport configuration."
    ],
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "be.goplay.app.tv/be.goplay.app.ui.consent.ConsentActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/547#issuecomment-2457783562",
        "issue": 547
      },
      {
        "kind": "source",
        "value": "be.vmma.vtm.zenderapp",
        "source": "https://github.com/PRProd/HA-Firemote/issues/547#issuecomment-2457783562",
        "issue": 547
      }
    ]
  },
  {
    "id": "nuvio",
    "aliases": [],
    "issues": [
      821
    ],
    "platforms": {
      "nvidia-shield": {
        "appName": "com.nuvio.tv",
        "androidName": "com.nuvio.tv",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/821"
          },
          {
            "kind": "official-manifest",
            "url": "https://raw.githubusercontent.com/NuvioMedia/NuvioTV/main/app/build.gradle.kts"
          },
          {
            "kind": "official-manifest",
            "url": "https://raw.githubusercontent.com/NuvioMedia/NuvioTV/main/app/src/main/AndroidManifest.xml"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/821",
      "https://github.com/NuvioMedia/NuvioTV",
      "https://raw.githubusercontent.com/NuvioMedia/NuvioTV/main/app/build.gradle.kts",
      "https://raw.githubusercontent.com/NuvioMedia/NuvioTV/main/app/src/main/AndroidManifest.xml"
    ],
    "notes": [
      "NuvioTV repository link only; no package, component or tested action in request. Obtain manifest/device evidence rather than inventing package from repo name."
    ],
    "displayName": "Nuvio (sideloaded)",
    "observedEvidence": []
  },
  {
    "id": "nuvio-playstore",
    "aliases": [],
    "issues": [
      821
    ],
    "platforms": {
      "nvidia-shield": {
        "appName": "com.nuvio.app",
        "androidName": "com.nuvio.app",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/821"
          },
          {
            "kind": "official-manifest",
            "url": "https://raw.githubusercontent.com/NuvioMedia/NuvioTV/main/app/build.gradle.kts"
          },
          {
            "kind": "official-manifest",
            "url": "https://raw.githubusercontent.com/NuvioMedia/NuvioTV/main/app/src/main/AndroidManifest.xml"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/821",
      "https://github.com/NuvioMedia/NuvioTV",
      "https://raw.githubusercontent.com/NuvioMedia/NuvioTV/main/app/build.gradle.kts",
      "https://raw.githubusercontent.com/NuvioMedia/NuvioTV/main/app/src/main/AndroidManifest.xml"
    ],
    "notes": [
      "NuvioTV repository link only; no package, component or tested action in request. Obtain manifest/device evidence rather than inventing package from repo name."
    ],
    "displayName": "Nuvio (Play Store)",
    "observedEvidence": []
  },
  {
    "id": "playlet",
    "aliases": [],
    "issues": [
      859
    ],
    "platforms": {
      "roku": {
        "appName": "Playlet",
        "launchStrategy": "source",
        "sourceAliases": [],
        "app-id": 693751,
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/859"
          },
          {
            "kind": "official-documentation",
            "url": "https://github.com/iBicha/playlet/blob/main/docs/README.md#in-case-of-a-softlock"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/859",
      "https://github.com/iBicha/playlet",
      "https://github.com/iBicha/playlet/blob/main/docs/README.md#in-case-of-a-softlock"
    ],
    "notes": [
      "Unlabeled Roku request links iBicha/playlet and contains no channel ID/source. Link identifies project, not launch identifier; obtain installed Roku app ID."
    ],
    "displayName": "Playlet",
    "observedEvidence": []
  },
  {
    "id": "oqee-freebox-pop",
    "aliases": [],
    "issues": [
      71
    ],
    "platforms": {
      "xiaomi": {
        "appName": "oqee.launcher",
        "androidName": "oqee.launcher",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/71"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/71",
      "https://github.com/PRProd/HA-Firemote/issues/71#issuecomment-1508793130"
    ],
    "notes": [
      "Crunchyroll confirmed working. OQEE Freebox Pop uses oqee.launcher rather than shipped generic OQEE package; request closed stale pending details. Generic oqee-by-free exists, but this device-specific variant remains unverified."
    ],
    "displayName": "OQEE (Freebox Pop variant)",
    "observedEvidence": []
  },
  {
    "id": "ninja-ninjabox",
    "aliases": [],
    "issues": [
      409
    ],
    "platforms": {
      "amazon-fire": {
        "appName": "com.ninja.ninjabox",
        "androidName": "com.ninja.ninjabox",
        "launchStrategy": "package",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/409"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/409",
      "https://teamninja.live/ninjaplayer.apk"
    ],
    "notes": [
      "Ninja APK identity mismatch com.jlwockee.iMPlayer vs com.ninja.ninjabox unresolved; closed without implementation. Do not copy a different build's ID.",
      "Only the installed NinjaBox package reported in the device source list is represented. The differently identified downloadable Ninja APK remains a separate unresolved build."
    ],
    "displayName": "Ninja (observed NinjaBox build)",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "com.ninja.ninjabox/com.ninja.ninjabox.view.activity.SeriesAllDataSingleActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/409",
        "issue": 409
      },
      {
        "kind": "observed_component",
        "value": "com.ninja.ninjabox/.view.activity.SeriesAllDataSingleActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/409",
        "issue": 409
      },
      {
        "kind": "source",
        "value": "com.ninja.ninjabox",
        "source": "https://github.com/PRProd/HA-Firemote/issues/409",
        "issue": 409
      }
    ]
  },
  {
    "id": "function-screen-mirroring",
    "aliases": [],
    "issues": [
      348,
      686
    ],
    "platforms": {
      "amazon-fire": {
        "launchStrategy": "command",
        "adbLaunchCommand": "adb shell am start -n com.amazon.cast.sink/.DisplayMirroringSinkActivity",
        "verification": "requires-device-validation",
        "evidence": [
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/348"
          },
          {
            "kind": "request",
            "url": "https://github.com/PRProd/HA-Firemote/issues/686"
          }
        ]
      }
    },
    "incompleteFamilies": {},
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/348",
      "https://github.com/PRProd/HA-Firemote/issues/686"
    ],
    "notes": [
      "System Miracast launch tested via custom ADB command; upstream intentionally did not add button because ADB/network control is lost in mirroring. Relates to open #686.",
      "System display mirroring rather than a store app. Explicit command com.amazon.cast.sink/.DisplayMirroringSinkActivity supplied. #348 confirmed ADB/network control can be lost in Miracast mode; acceptance must include recovery via physical remote.",
      "Entering Miracast can disconnect ADB/network control. Exit/recovery requires the physical remote; no Home Assistant recovery was validated."
    ],
    "displayName": "Function: Display mirroring (physical remote needed to exit)",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "com.amazon.cast.sink/.DisplayMirroringSinkActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/348#issuecomment-2016976492",
        "issue": 348
      },
      {
        "kind": "observed_component",
        "value": "com.amazon.cast.sink/.DisplayMirroringSinkActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/348#issuecomment-2017334073",
        "issue": 348
      },
      {
        "kind": "observed_component",
        "value": "com.amazon.cast.sink/.DisplayMirroringSinkActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/686",
        "issue": 686
      }
    ]
  },
  {
    "id": "showtime",
    "aliases": [],
    "issues": [],
    "platforms": {},
    "incompleteFamilies": {},
    "sources": [
      "https://help.showtime.com/hc/en-us/articles/16694786598043-What-is-happening-to-the-SHOWTIME-streaming-service"
    ],
    "notes": [
      "Retired standalone service. Existing YAML IDs and launch data are preserved; no automatic substitution or subscription migration."
    ],
    "displayName": "Showtime (retired; legacy choice)",
    "lifecycle": "legacy",
    "observedEvidence": []
  },
  {
    "id": "showtime-anytime",
    "aliases": [],
    "issues": [],
    "platforms": {},
    "incompleteFamilies": {},
    "sources": [
      "https://help.showtime.com/hc/en-us/articles/16694786598043-What-is-happening-to-the-SHOWTIME-streaming-service",
      "https://d15yx0mnc9teae.cloudfront.net/sites/default/files/2023-10/JIRA%20629%20NYC_SouthManhattan_NY%20.NET%20TEMPLATE.pdf"
    ],
    "notes": [
      "Retired standalone service. Existing YAML IDs and launch data are preserved; no automatic substitution or subscription migration."
    ],
    "displayName": "Showtime Anytime (retired; legacy choice)",
    "lifecycle": "legacy",
    "observedEvidence": []
  },
  {
    "id": "pathe-thuis",
    "aliases": [],
    "issues": [],
    "platforms": {},
    "incompleteFamilies": {
      "chromecast": "Baseline advertised this family without any launch data. Need a TV-compatible Android package or supported deep link; Apple source Pathé Thuis cannot launch Android.",
      "nvidia-shield": "Baseline advertised this family without any launch data. Need a TV-compatible Android package or supported deep link; Apple source Pathé Thuis cannot launch Android.",
      "onn": "Baseline advertised this family without any launch data. Need a TV-compatible Android package or supported deep link; Apple source Pathé Thuis cannot launch Android.",
      "xiaomi": "Baseline advertised this family without any launch data. Need a TV-compatible Android package or supported deep link; Apple source Pathé Thuis cannot launch Android."
    },
    "sources": [],
    "notes": [],
    "observedEvidence": []
  },
  {
    "id": "tvlauncher",
    "aliases": [],
    "issues": [
      607
    ],
    "platforms": {},
    "incompleteFamilies": {
      "apple-tv": "Apple lookup verifies bundle app.FootWare.LiveTV, but no installed tvOS source or supported deep link is known. Store title is not a launch source."
    },
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/607",
      "https://apps.apple.com/gb/app/tv-launcher-live-uk-channels/id1622598042",
      "https://itunes.apple.com/lookup?id=1622598042&country=gb"
    ],
    "notes": [
      "Linked TV Launcher live UK channels, not the built-in Apple TV app. TV Launcher is absent from supplied source_list; maintainer's Apple TV suggestion does not resolve this request."
    ],
    "displayName": "TV Launcher",
    "observedEvidence": []
  },
  {
    "id": "opus-iptv",
    "aliases": [],
    "issues": [
      721
    ],
    "platforms": {},
    "incompleteFamilies": {
      "apple-tv": "Apple lookup verifies bundle com.handy.optus. Exact installed tvOS source or a supported deep link is still required."
    },
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/721",
      "https://apps.apple.com/de/app/xtream-iptv-player-opus/id1592313576",
      "https://itunes.apple.com/lookup?id=1592313576&country=de"
    ],
    "notes": [
      "OPUS App Store id 1592313576 identifies the product but no tvOS source_list/app_name/deep link was supplied. Do not infer launch name from store title."
    ],
    "displayName": "OPUS IPTV",
    "observedEvidence": []
  },
  {
    "id": "legionanimefull",
    "aliases": [],
    "issues": [
      733
    ],
    "platforms": {},
    "incompleteFamilies": {
      "xiaomi": "APK landing page supplies no verified package, exported launcher, or working action. The primary APK page was inaccessible during implementation."
    },
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/733"
    ],
    "notes": [
      "Legion Anime Full APK download URL supplied, but no package, component or tested action. Keep as evidence-gated request."
    ],
    "displayName": "Legion Anime Full",
    "observedEvidence": []
  },
  {
    "id": "ninja",
    "aliases": [],
    "issues": [
      409
    ],
    "platforms": {},
    "incompleteFamilies": {
      "amazon-fire": "APK build identity com.jlwockee.iMPlayer conflicts with observed com.ninja.ninjabox. Identify the installed build and package before adding an executable preset."
    },
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/409",
      "https://teamninja.live/ninjaplayer.apk"
    ],
    "notes": [
      "Ninja APK identity mismatch com.jlwockee.iMPlayer vs com.ninja.ninjabox unresolved; closed without implementation. Do not copy a different build's ID."
    ],
    "displayName": "Ninja",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "com.ninja.ninjabox/com.ninja.ninjabox.view.activity.SeriesAllDataSingleActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/409",
        "issue": 409
      },
      {
        "kind": "observed_component",
        "value": "com.ninja.ninjabox/.view.activity.SeriesAllDataSingleActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/409",
        "issue": 409
      },
      {
        "kind": "source",
        "value": "com.ninja.ninjabox",
        "source": "https://github.com/PRProd/HA-Firemote/issues/409",
        "issue": 409
      }
    ]
  },
  {
    "id": "directv-set-top",
    "aliases": [],
    "issues": [
      170
    ],
    "platforms": {},
    "incompleteFamilies": {
      "none": "Package com.att.tv.openvideo is reported, but the request does not select a supported device family. Identify the actual adapter/device before enabling this set-top variant; do not substitute DIRECTV Stream."
    },
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/170"
    ],
    "notes": [
      "DIRECTV set-top/Sony Android path, com.att.tv.openvideo candidate tested by maintainer request only; closed stale without success. Distinct from confirmed DIRECTV stream preset."
    ],
    "displayName": "DIRECTV (set-top TV app)",
    "region": "US",
    "observedEvidence": [
      {
        "kind": "app_name",
        "value": "com.att.tv.openvideo",
        "source": "https://github.com/PRProd/HA-Firemote/issues/170",
        "issue": 170
      },
      {
        "kind": "source",
        "value": "com.att.tv.openvideo",
        "source": "https://github.com/PRProd/HA-Firemote/issues/170",
        "issue": 170
      },
      {
        "kind": "app_id",
        "value": "com.att.tv.openvideo",
        "source": "https://github.com/PRProd/HA-Firemote/issues/170",
        "issue": 170
      },
      {
        "kind": "app_id",
        "value": "AndroidNativeApp",
        "source": "https://github.com/PRProd/HA-Firemote/issues/170",
        "issue": 170
      },
      {
        "kind": "app_name",
        "value": "DIRECTV",
        "source": "https://github.com/PRProd/HA-Firemote/issues/170",
        "issue": 170
      },
      {
        "kind": "observed_component",
        "value": "com.sony.dtv.tvx/com.sony.dtv.tvx.MainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/170#issuecomment-1703358468",
        "issue": 170
      },
      {
        "kind": "observed_component",
        "value": "com.sony.dtv.tvx/.MainActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/170#issuecomment-1703358468",
        "issue": 170
      },
      {
        "kind": "observed_component",
        "value": "com.att.tv.openvideo/com.att.ngctv.dfw.navigation.MainNavigationActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/170#issuecomment-1703358468",
        "issue": 170
      },
      {
        "kind": "app_id",
        "value": "com.sony.dtv.tvx",
        "source": "https://github.com/PRProd/HA-Firemote/issues/170#issuecomment-1703358468",
        "issue": 170
      },
      {
        "kind": "app_name",
        "value": "TV",
        "source": "https://github.com/PRProd/HA-Firemote/issues/170#issuecomment-1703358468",
        "issue": 170
      },
      {
        "kind": "source",
        "value": "TV",
        "source": "https://github.com/PRProd/HA-Firemote/issues/170#issuecomment-1703358468",
        "issue": 170
      },
      {
        "kind": "app_id",
        "value": "com.sony.dtv.tvx",
        "source": "https://github.com/PRProd/HA-Firemote/issues/170#issuecomment-1703358468",
        "issue": 170
      },
      {
        "kind": "app_name",
        "value": "TV",
        "source": "https://github.com/PRProd/HA-Firemote/issues/170#issuecomment-1703358468",
        "issue": 170
      },
      {
        "kind": "source",
        "value": "TV",
        "source": "https://github.com/PRProd/HA-Firemote/issues/170#issuecomment-1703358468",
        "issue": 170
      },
      {
        "kind": "observed_component",
        "value": "com.att.tv.openvideo/com.att.ngctv.dfw.navigation.MainNavigationActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/170#issuecomment-1710697729",
        "issue": 170
      }
    ]
  },
  {
    "id": "mytvonline3",
    "aliases": [],
    "issues": [
      318
    ],
    "platforms": {},
    "incompleteFamilies": {
      "amazon-fire": "Formuler-only app: observed playback activities do not establish installability or launch support on the requested device families.",
      "chromecast": "Formuler-only app: observed playback activities do not establish installability or launch support on the requested device families.",
      "nvidia-shield": "Formuler-only app: observed playback activities do not establish installability or launch support on the requested device families."
    },
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/318"
    ],
    "notes": [
      "MYTVOnline3/Formuler-only build; upstream declined unsupported hardware and suggested custom launcher. No local preset; do not label implemented."
    ],
    "displayName": "MYTVOnline3",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "tv.formuler.mol3.real/tv.formuler.mol3.live.view.LiveActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/318",
        "issue": 318
      },
      {
        "kind": "observed_component",
        "value": "tv.formuler.mol3.real/tv.formuler.mol3.vod.ui.StreamActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/318",
        "issue": 318
      }
    ]
  },
  {
    "id": "mytvonline2",
    "aliases": [],
    "issues": [
      319
    ],
    "platforms": {},
    "incompleteFamilies": {
      "amazon-fire": "Formuler-only app: establish installability and supported hardware before enabling launch.",
      "chromecast": "Formuler-only app: establish installability and supported hardware before enabling launch.",
      "nvidia-shield": "Formuler-only app: establish installability and supported hardware before enabling launch."
    },
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/319"
    ],
    "notes": [
      "MYTVOnline2/Formuler-only build; upstream declined unsupported hardware. No local preset; do not label implemented."
    ],
    "displayName": "MYTVOnline2",
    "observedEvidence": [
      {
        "kind": "observed_component",
        "value": "tv.formuler.mytvonline.real/tv.formuler.mytvonline.live.LiveActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/319",
        "issue": 319
      },
      {
        "kind": "observed_component",
        "value": "tv.formuler.mytvonline.real/tv.formuler.mytvonline.vod.VodListActivity",
        "source": "https://github.com/PRProd/HA-Firemote/issues/319",
        "issue": 319
      }
    ]
  },
  {
    "id": "pooya-tv",
    "aliases": [],
    "issues": [
      634
    ],
    "platforms": {},
    "incompleteFamilies": {
      "chromecast": "Only custom intent action androidx.media3.demo.main.action.VIEW is known; actual app package or a fully specified working custom action is required."
    },
    "sources": [
      "https://github.com/PRProd/HA-Firemote/issues/634"
    ],
    "notes": [
      "Custom launchers already support HA actions. Comment supplies intent action androidx.media3.demo.main.action.VIEW, not a package identifier. Document custom launcher example and slot availability; native Pooya preset needs actual app identity/launch metadata."
    ],
    "displayName": "Pooya TV / custom Media3 app",
    "observedEvidence": []
  }
];
