import {Directive, ElementRef, Renderer, EventEmitter, Output, HostListener, Input, AfterViewInit} from '@angular/core';
declare var $: any;
@Directive({
  selector: '[jsetup-date]'
})
//http://eonasdan.github.io/bootstrap-datetimepicker/ContributorsGuide/#introduction
export class DatetimepickerDirective implements AfterViewInit {

  @Output() ngModelChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() showTime: Boolean = false;

  constructor(private el: ElementRef, private render: Renderer) {}

  ngAfterViewInit() {

    let element = $(this.el.nativeElement);
    let datapicker = element.datetimepicker({
      keepOpen: false,
      debug: true,
    });

    element.on('dp.change', ((event) => {
      this.ngModelChange.emit($(event.currentTarget).val());
    }))

    const body = document.getElementsByTagName('body')[0];
    body.addEventListener('click', (e) => {
      if (this.el.nativeElement !== e.target && !this.el.nativeElement.contains(e.target)) {
        datapicker.data('DateTimePicker').hide();
      }
    }, false);


  }
}
