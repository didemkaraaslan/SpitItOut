import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import Confession from "./Confession.jsx";

class ContentPanel extends Component {
  state = {
    confessions: [
      {
        user: {
          username: "Didem Kucukkaraaslan",
          photoURL:
            "https://s.gravatar.com/avatar/2f027587fe5aa459c6e85f5f1b41d2df?s=60"
        },
        content: "Edit: Im relieved its still standing! Im not religious, certainly not catholic, or spiritual. But Notre Dame is a massive monument in history, and has withstood so much in 800 years that itss a miracle it even still exits. The building is an engineering ",
        tag: "Sad",
        timestamp: "15 min ago",
        views: 222,
        likes: 99,
        dislikes: 22,
        comments: 12
      },
      {
        user: {
          username: "Busra Polat",
          photoURL:
            "https://s.gravatar.com/avatar/2f027587fe5aa459c6e85f5f1b41d2df?s=60"
        },
        content: "Edit: Im relieved its still standing! Im not religious, certainly not catholic, or spiritual. But Notre Dame is a massive monument in history, and has withstood so much in 800 years that itss a miracle it even still exits. The building is an engineering ",
        tag: "Happy",
        timestamp: "2 min ago",
        views: 100,
        likes: 34,
        dislikes: 11,
        comments: 2
      },
      {
        user: {
          username: "Anonymous2213123213",
          photoURL:
            "https://s.gravatar.com/avatar/2f027587fe5aa459c6e85f5f1b41d2df?s=60"
        },
        content: "Edit: Im relieved its still standing! Im not religious, certainly not catholic, or spiritual. But Notre Dame is a massive monument in history, and has withstood so much in 800 years that itss a miracle it even still exits. The building is an engineering ",
        tag: "First Experience",
        timestamp: "just now",
        views: 333,
        likes: 1,
        dislikes: 22,
        comments: 333333333333333333333
      }
    ]
  };

  render() {
    const { confessions } = this.state;

    return (
      <Container style={{ marginTop: "50px" }}>
        {confessions.map((confession, key) => (
          <Confession key={key} confession={confession} />
        ))}
      </Container>
    );
  }
}

export default ContentPanel;
