import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const ADD_COMMENT = gql`
    mutation add($postId: Int!, $comment: CommentInput!) {
        addComment(postId: $postId, comment: $comment) {
            id
        }
    }
`;

@Component({
    selector: 'app-comment-form',
    templateUrl: './comment-form.component.html',
    styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {

    @Input() postId;

    @Output() onAdded = new EventEmitter<void>();

    model: any = {};

    constructor(
        private apollo: Apollo,
    ) { }

    ngOnInit() {
    }

    addComment() {
        this.apollo.mutate({
            mutation: ADD_COMMENT,
            variables: {
                postId: this.postId,
                comment: this.model,
            }
        }).subscribe(({ data }) => {
            this.model = {};
            this.onAdded.emit();
            console.log('got data', data);
        },(error) => {
            console.log('there was an error sending the query', error);
        });
    }

}
