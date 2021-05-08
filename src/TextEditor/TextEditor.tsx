import * as React from "react";
// import '../textEditor/ui/TextEditor.css';
import "../TextEditor/TextEditor.css";

class TextEditor extends React.Component {
  public state = {
    text: "",
    tempText: "",
    dataLoaded: false,
  };

  public documentData: any;
  constructor(props: any) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.setData = this.setData.bind(this);
    this.insertPhoto = this.insertPhoto.bind(this);
    this.insertLink = this.insertLink.bind(this);
    this.insertVideo = this.insertVideo.bind(this);
    this.getData();
  }

  public componentDidMount() {
    this.getData();
  }

  public handleChange(event: any) {
    this.setState({
      tempText: event.target.innerHTML,
    });
  }

  public setData(e: any) {
    e.preventDefault();
    this.setState(
      {
        text: this.documentData.tempText,
      },
      () => {
        localStorage.setItem("document", JSON.stringify(this.state));
      }
    );
  }

  public getData = () => {
    const item: string = localStorage.getItem("document") || "";
    this.documentData = item;
    this.setState({
      text: this.documentData.tempText,
      tempText: this.documentData.tempText,
      dataLoaded: true,
    });
  };

  public insertLink() {
    const URL = prompt("Enter a URL:", "http://");
    if (URL !== null && URL !== "") {
      document.execCommand("CreateLink", false, URL);
    }
  }

  public insertPhoto(e: any) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result) {
        const path: string = reader.result.toString();
        document.execCommand("insertimage", false, path);
      }
    };
  }

  public insertVideo() {
    const urlPrompt = prompt("Enter Youtube Url:", "http://");
    if (urlPrompt) {
      const res = urlPrompt.substring(32, 43);
      const embed =
        '<iframe src="https://www.youtube.com/embed/' +
        res +
        '" allowfullscreen="true" width="300" frameborder="0" height="150"></iframe>';
      document.execCommand("insertHTML", false, embed);
    }
  }

  public render() {
    return (
      <>
        <div className="textarea__wrapper">
          <div className="button_wrapper">
            <button
              onClick={() => document.execCommand("formatBlock", true, "h1")}
            >
              <i className="fa fa-heading"></i>
              <b>1</b>
            </button>
            <button
              onClick={() => document.execCommand("formatBlock", true, "h2")}
            >
              <i className="fa fa-heading"></i>
              <b>2</b>
            </button>
            <button onClick={() => document.execCommand("bold")}>
              <i className="fas fa-bold"></i>
            </button>
            <button onClick={() => document.execCommand("italic")}>
              <i className="fas fa-italic"></i>
            </button>
            <button onClick={() => document.execCommand("strikethrough")}>
              <i className="fas fa-strikethrough"></i>
            </button>
            <button onClick={() => document.execCommand("indent")}>
              <i className="fas fa-indent"></i>
            </button>
            <button onClick={() => document.execCommand("outdent")}>
              <i className="fas fa-outdent"></i>
            </button>
            <button onClick={() => document.execCommand("insertUnorderedList")}>
              <i className="fas fa-list-ul"></i>
            </button>
            <button onClick={() => document.execCommand("insertOrderedList")}>
              <i className="fas fa-list-ol"></i>
            </button>
            <button
              onClick={() =>
                document.execCommand("HiliteColor", false, "yellow")
              }
            >
              <i className="fas fa-highlighter"></i>
            </button>
            <button onClick={() => this.insertLink()}>
              <i className="fas fa-link"></i>
            </button>
            <input
              type="file"
              id="photo-add"
              className="custom-file"
              onChange={(e) => this.insertPhoto(e)}
            />
            <button onClick={() => this.insertVideo()}>
              <i className="fas fa-video"></i>
            </button>
            <div
              style={{
                paddingTop: 7,
              }}
            ></div>
          </div>
          <div
            id="textbox"
            onInput={(event) => this.handleChange(event)}
            contentEditable={true}
            className="text_wrapper"
            dangerouslySetInnerHTML={{ __html: this.state.text }}
          />
        </div>
        <button id="special__button" onClick={(event) => this.setData(event)}>
          Save
        </button>
      </>
    );
  }
}

export default TextEditor;
