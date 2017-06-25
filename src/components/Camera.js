import React, { Component } from 'react';
import { uploadFile } from '../helpers/files';
import { Button, Alert } from 'antd';

export default class Camera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploading: false,
    };
  }

  componentDidMount() {
    this.cameraInput.addEventListener('change', this._willUpload);
  }

  _willUpload = e => {
    const { run, venue, onUploaded } = this.props;
    this.setState({ uploading: true });

    uploadFile({ file: this.cameraInput.files[0], run, venue })
      .then(onUploaded)
      .then(() => {
        this.setState({ uploading: false });
      });
    this.cameraInput.value = '';
  };

  _upload = () => {
    this.cameraInput.click();
  };

  render() {
    const { isNear } = this.props;
    const { uploading } = this.state;
    let alertMessage = `Get closer!`;
    if (isNear) alertMessage = `Take a photo!  📸`;
    if (uploading) alertMessage = `Uploading...`;

    return (
      <div className="BottomBar--photo">
        <input
          type="file"
          accept="image/*"
          ref={input => {
            this.cameraInput = input;
          }}
          disabled={!isNear}
        />
        <Button
          shape="circle"
          icon="camera"
          size="large"
          onClick={this._upload}
          loading={!isNear || uploading}
          disabled={!isNear || uploading}
        />
        <Alert
          style={{ textAlign: 'center', marginTop: '1em' }}
          type={isNear ? 'error' : 'info'}
          message={alertMessage}
        />
      </div>
    );
  }
}
