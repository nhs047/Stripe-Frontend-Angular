import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { DialogService } from '../../shared/modules/dialog/dialog.module';

import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  Appearance,
  StripeCardElementOptions,
  StripeElementLocale,
  StripeElementsOptions,
} from '@stripe/stripe-js';

import { PaymentService } from '../services/payment.service';


@Component({
  selector: 'payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})

export class PaymentComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  @ViewChild("modalContent") modalContent: TemplateRef<any>;


  cardOptions: StripeCardElementOptions = {

  };

  appearance: Appearance = {
    theme: 'stripe'
  };

  local: StripeElementLocale = "en";
  elementsOptions: StripeElementsOptions = {
    locale: this.local,
    appearance: this.appearance
    };

  stripeTest: FormGroup;
  clientSecret: string;

  constructor(private paymentService: PaymentService, private cd: ChangeDetectorRef,  private http: HttpClient,
    private fb: FormBuilder,
    private stripeService: StripeService,
    private dialogService: DialogService) {
    }

  ngOnInit(): void {
    this.stripeTest = this.fb.group({ })
    this.clientSecret = "pi_3KfrY0ALv0faE7iR0QO68IkR_secret_JH23Y1YJWisG1LN6jL9kpNtlr";    
  }

  payWithStripe() {
    this.dialogService.openModal({
      maxWidth: "100vw",
      panelClass: "custom-dialog",
      disableClose: true,
      data: {
        header: {
          title: "EDIT_BOARD",
          iconMaterialType: false,
          closeButton: true,
          textColor: "text-color"
        },
        footer: {
          doneButton: "SAVE"
        },
        template: {
          body: this.modalContent
        },
        functions: {
          confirm: this.pay
        }
      }
      });

    
  }

  pay = () => {
    console.log(this.card.element);
    
        this.stripeService.confirmCardPayment(`${this.clientSecret}`, {
          payment_method: {
            card: this.card.element,
          },
        }).subscribe((result) => {
          console.log(result);
            if (result && result["error"]) {
              console.log(result["error"].message);
            } else if(!result["error"] && result["paymentIntent"].status === 'requires_capture') {
              this.paymentService.validatePaymentIntent(this.clientSecret.split("_secret")[0]).subscribe(res => {
                console.log(res);
              })
            }
        });
  }

}
