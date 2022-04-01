import { NgModule } from '@angular/core';
import { NgxStripeModule } from 'ngx-stripe';
import { RouterModule, Routes } from '@angular/router';
import { PaymentService } from './services/payment.service';
import { PaymentComponent } from './component/payment.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { DialogModule } from "../shared/modules/dialog/dialog.module";

@NgModule({
  declarations: [
    PaymentComponent
  ],
  imports: [
    FormsModule,
    DialogModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot('pk_test_51IoQjMALv0faE7iRQCweveH5Zms1vNMC0EWSFeX4tiG0fn55uqgfY2TbOFhZbqkfHX8dLigWVjTSTatAcF8QkEy1008Ha7Ebic'),
    RouterModule.forChild([
      {
        path: "",
        component: PaymentComponent,
      }
    ] as Routes)
  ],
  providers: [PaymentService]
})
export class PaymentModule { }
