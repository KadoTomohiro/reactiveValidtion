import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, ValidationErrors, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  inputStatus: 'none' | 'focus' | 'error' = 'none'
  length = 0

  control: FormControl = this.fb.control('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(10),
    Validators.pattern(/^[a-zA-Z]+$/)
  ])

  messages: {[key: string]: string}= {
    required: '必須入力です',
    minlength: '3文字以上で入力してください',
    maxlength: '10文字以下で入力してください',
    pattern: 'アルファベットのみで入力してください'
  }

  constructor(private fb: FormBuilder) {
  }

  isError(): boolean {
    return (this.control.value || this.control.dirty) && this.control.invalid
  }

  errors(): ValidationErrors {
    return this.control.errors ?? {}
  }

  message(error: {key: string, value: any}): string {
    return this.messages[error.key]
  }

  focus() {
    this.inputStatus = 'focus'
  }

  blur() {
    this.inputStatus = this.isError() ? 'error' : 'none';
  }

  input() {
    this.length = this.control.value.length
  }
}
