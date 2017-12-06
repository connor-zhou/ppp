import { Component } from '@angular/core';
import { GlobalEventsManager } from '../../services/GlobalEventManager.service';

@Component({
    template:`
        <ban></ban>
        <business></business>           
        <safety></safety>
        <notice></notice>
        <!--<novice></novice>-->
        <recommend></recommend>    
        <media></media>
        <!--<ad></ad>-->
        <!--<industry></industry>-->
`
})

export class IndexComponent{
    constructor(private globalEventsManager: GlobalEventsManager){}
}
