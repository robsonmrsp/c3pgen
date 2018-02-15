import {Directive, ElementRef, Renderer, EventEmitter, Output, HostListener, Input, AfterViewInit, NgZone, ChangeDetectorRef, ViewContainerRef, OnChanges, SimpleChanges} from '@angular/core';
import {ControlValueAccessor, NgControl} from '@angular/forms';

declare var $: any;
const noop = () => {
  console.log('noop')
};


@Directive({
  selector: '[jsetup-mask]',
})
export class MaskDirective implements AfterViewInit {

  @Output() ngModelChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() mask: string = '';

  constructor(private el: ElementRef, private ngControl: NgControl) {

  }
  ngAfterViewInit() {
    $(this.el).inputmask(this.mask);
    $(this.el.nativeElement).change((event) => {
      this.ngModelChange.emit($(event.currentTarget).val());
    })
  }
}
