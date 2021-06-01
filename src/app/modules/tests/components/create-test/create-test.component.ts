import { Component, OnInit } from '@angular/core';
import { TestService } from '../../test.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'mn-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss']
})
export class CreateTestComponent implements OnInit {
  form: FormGroup;

  constructor(private readonly testService: TestService,
              private readonly fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: this.fb.control(null, [Validators.required, Validators.minLength(3)]),
      previewUrl: this.fb.control(null),
      tags: this.fb.control(null, [Validators.required]),
      questions: this.fb.array([], [Validators.required]),
    });
  }

}
