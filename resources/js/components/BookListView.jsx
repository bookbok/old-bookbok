import React, { Component } from 'react';

export class BookListView extends Component {
  render() {
      const bookBody = [];
      const bookName = [];
      const book = [
        {name:"c++", body:'images/book01.jpg'},
        {name:"react01", body:'images/book02.jpg'},
        {name:"react02", body:'images/book03.jpg'},
      ];

      for (var key in book) {
          bookBody.push(<td><img src={book[key].body} /></td>);
          bookName.push(<th>{book[key].name}</th>);
      }

      return (
          <table border="1">
              <tr>
                {bookBody}
              </tr>
              <tr>
                {bookName}
              </tr>
          </table>
      );
  }  
}
