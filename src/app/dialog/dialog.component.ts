import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  freshnesslist = ['new brand', ' second hand', 'refurbished'];
  actionbtn: string = 'save';
  productFrom!: FormGroup;
  constructor(
    private frombuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogref: MatDialogRef<DialogComponent>
  ) {}
  ngOnInit(): void {
    this.productFrom = this.frombuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required],
    });

    if (this.editData) {
      this.actionbtn = 'Update';
      this.productFrom.controls['productName'].setValue(
        this.editData.productName
      );
      this.productFrom.controls['category'].setValue(this.editData.category);
      this.productFrom.controls['date'].setValue(this.editData.date);
      this.productFrom.controls['freshness'].setValue(this.editData.freshness);
      this.productFrom.controls['price'].setValue(this.editData.price);
      this.productFrom.controls['comment'].setValue(this.editData.comment);
    }
  }
  addProduct() {
    if (!this.editData) {
      if (this.productFrom.valid) {
        this.api.postProduct(this.productFrom.value).subscribe({
          next: (res) => {
            Swal.fire('Success!', 'Data inserted successfully!', 'success');
            this.productFrom.reset();
            this.dialogref.close('save');

          },
          error: () => {
            Swal.fire({
              title: 'Error!',
              text: 'Something Went Wrong.',
              icon: 'error',
              confirmButtonText: 'ok',
            });
          },
        });
      }
    } else {
      this.updateProduct();
    }
  }

  updateProduct() {
    this.api.putProduct(this.editData.id ,this.productFrom.value ).subscribe({
      next: (res) => {
        Swal.fire('Update!', 'Data Upadted successfully!', 'success');
        this.productFrom.reset();
        this.dialogref.close('update');
      },
      error: () => {
        Swal.fire({
          title: 'Error!',
          text: 'Something Went Wrong.',
          icon: 'error',
          confirmButtonText: 'ok',
        });
      },
    });
  }
}
