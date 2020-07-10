import { Injectable, TemplateRef } from '@angular/core';


export enum toastType {
  SUCCESS = 1,
  WARNING = 2,
  ERROR = 3
}
export interface Toast {
  textOrTpl: string | TemplateRef<any>,
  options?: ToastOptions
}
export interface ToastOptions {
  type?: toastType,
  delay?: string
  icon?: string
}
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toasts: Toast[] = [];
  constructor() { }

  /**
   * 
   * @param textOrTpl @param textOrTpl show('Item added to Card Successfully ', { classname: 'bg-dark text-light fadeInDown', delay: 5000 })
   * @param options 
   */
  private show(_textOrTpl: string | TemplateRef<any>, options: ToastOptions = {}) {
    const toast: Toast = {
      textOrTpl: _textOrTpl,
      options: { ...options }
    };
    this.toasts.push(toast);
  }

  failure(text: string, icon?: string) {
    this.show(text, { type: toastType.WARNING, icon :icon });
  }
  
  success(text: string, icon?: string) {
    this.show(text, { type: toastType.SUCCESS, icon: icon });
  }

  warning(text: string, icon?: string) {
    this.show(text, { type: toastType.WARNING, icon: icon });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
