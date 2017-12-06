import {Component, OnInit} from '@angular/core';
import {OfflineOptions, ControlAnchor,NavigationControlType} from 'angular2-baidu-map';

@Component({
    selector: 'bmap',
    template: `
        <baidu-map ak="xNXLcAMZp5lS9iaheEes894m" [options]="opts" [offline]="offlineOpts" (onMapLoaded)="loadMap($event)" (onMarkerClicked)="clickMarker($event)"></baidu-map>
        `,
    styles: [`
        baidu-map{
            width: 876px;
            height: 300px;
            display: block;
        }
        
        .baiduMap .iw_poi_content {font:12px arial,sans-serif;overflow:visible;padding-top:4px;white-space:-moz-pre-wrap;word-wrap:break-word}

        .baiduMap  .iw_poi_title {color:#CC5522;font-size:14px;font-weight:bold;overflow:hidden;padding-right:13px;white-space:nowrap}  .iw_poi_content {font:12px arial,sans-serif;overflow:visible;padding-top:4px;white-space:-moz-pre-wrap;word-wrap:break-word}

    `,]
})
export class Map implements OnInit {

    opts: any;
    offlineOpts: OfflineOptions;

    ngOnInit() {
        this.opts = {
            center: {
                longitude: 121.315606,
                latitude: 31.200477
            },
            zoom: 19,
            markers: [{
                width:100,
                height:60,
                longitude: 121.315606,
                latitude: 31.200477,
                title: '上海星湖金融信息服务有限公司',
                content: '上海市闵行区申滨路25号B303',
                autoDisplayInfoWindow:true
            }],
            geolocationCtrl: {
                anchor: ControlAnchor.BMAP_ANCHOR_BOTTOM_RIGHT,
                showAddressBar: true
            },
            scaleCtrl: {
                anchor: ControlAnchor.BMAP_ANCHOR_BOTTOM_RIGHT

            },
            overviewCtrl: {
                isOpen: false
            },
            navCtrl: {
                type: NavigationControlType.BMAP_NAVIGATION_CONTROL_LARGE
            }
        };

        this.offlineOpts = {
            retryInterval: 5000,
            txt: 'NO-NETWORK'
        };
    }

    loadMap(map: any) {
        console.log('map instance here', map);
    }

    clickMarker(marker: any){
        console.log('The clicked marker is', marker);
    }
}
