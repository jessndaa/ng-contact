import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialDesignModule } from './material.design';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    declarations: [],
    imports: [ CommonModule, MaterialDesignModule, FlexLayoutModule],
    exports: [MaterialDesignModule, FlexLayoutModule],
    providers: [],
})
export class DesignModule {}
