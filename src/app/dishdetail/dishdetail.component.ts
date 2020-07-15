import { Component, OnInit, Inject} from '@angular/core';
import { Params, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Dish } from '../shared/dish';
import { Comment } from "../shared/comment";
import { DishService } from "../services/dish.service";
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  
  dish: Dish;
  copydish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  comment: Comment;
  commentForm: FormGroup;
  errmess: string;

  formErrors = {
    'author': '',
    'comment': '',
  };

  validationMessages = {
    'author': {
      'required': 'Name is required',
      'minlength': 'Name should be atleast of 2 characters long',
      'maxlength': 'Name can not be more than 25 characters long'
    },
    'comment': {
      'required': 'Comment is required',
    }
  }

  constructor(private dishService : DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') public BaseURL) {
      this.createForm();
    }

  ngOnInit() {
    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds, errmess => this.errmess = errmess);
    this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
      .subscribe(dish => {
        this.dish = dish;
        this.copydish = dish;
        this.setPrevNext(dish.id);
      },
      errmess => this.errmess = <any>errmess)
  }

  goBack(): void {
    this.location.back();
  }

  setPrevNext(dishId: string){
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  createForm(): void {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      rating: 5,
      comment: ['', Validators.required],
    });

    this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged()
  }

  onValueChanged(data?:any) {
    if(!this.commentForm) {
      return;
    }
    const form = this.commentForm;
    for(const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        this.formErrors[field] = '';
        const control = form.get(field);
        if( control && control.dirty && !control.valid){
          const messages = this.validationMessages[field];
          for(const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.formErrors[field] += messages[key] + ' '; 
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    const date = new Date();
    this.comment['date'] = date.toISOString();
    this.copydish.comments.push(this.comment);
    this.dishService.putDish(this.copydish).subscribe(
      dish => {
        this.dish = dish;
        this.copydish = dish;
      },
      errmess => {
        this.dish = null;
        this.copydish = null;
        this.errmess = <any>errmess;
      }
    );
    console.log(this.comment);
    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: '',
    });
  }

}
