import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Post} from '../../shared/interfaces';
import {PostsService} from '../../shared/posts.service';
import {AlertService} from '../shared/services/alert.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  forms: FormGroup;
  constructor(
    private postsService: PostsService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.forms = new FormGroup({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required)
    });
  }
   submit() {
    if (this.forms.invalid) {
      return;
    }
    const post: Post = {
      title: this.forms.value.title,
      author: this.forms.value.author,
      text: this.forms.value.text,
      date: new Date()
    };
    this.postsService.create(post).subscribe(() => {
      this.forms.reset();
      this.alertService.success('Пост был создан');
    });
   }
}
