import {Directive, HostListener, EventEmitter, Output, ElementRef} from '@angular/core';

@Directive({
  selector: "[scroll-directive]"
})
export class ScrollDirective {

  el:ElementRef;

  constructor(el: ElementRef) {
    this.el = el;
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {

    // const scrollPosition = window.pageYOffset;

    // if (scrollPosition >= this.el.nativeElement.offsetTop) {
    //   this.el.nativeElement.style.backgroundColor = 'black';
    // } else {
    //   this.el.nativeElement.style.backgroundColor = 'red';
    // }

    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number < 50) {
      return this.el.nativeElement.style.backgroundColor = 'black';
    } 
    else{
      this.el.nativeElement.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    }
  }
}

