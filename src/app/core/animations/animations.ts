import { animate, style, transition, trigger } from '@angular/animations';

export const slideDown = trigger('slideDown', [      
  transition(':enter', [
    style({transform: 'translateY(-100%)'}),
    animate('200ms ease-in', style({transform: 'translateY(0%)'}))
  ]),
  transition(':leave', [
    animate('200ms ease-in', style({transform: 'translateY(-100%)'}))
  ])
]);

export const slideLeft = trigger('slideLeft', [      
  transition(':enter', [style({ transform: 'translateX(100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))]),
  transition(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(100%)' }))])
]);