import React, { Component } from 'react';
import { uploadFile } from '../helpers/files';
import { Button, Alert } from 'antd';

export default class Camera extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.cameraInput.addEventListener('change', this._willUpload);
  }

  _willUpload = e => {
    const { run, venue, onUploaded } = this.props;

    uploadFile({ file: this.cameraInput.files[0], run, venue }).then(
      onUploaded
    );
  };

  _upload = () => {
    this.cameraInput.click();
  };

  render() {
    const { isNear } = this.props;
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
          loading={!isNear}
          disabled={!isNear}
        />
        <Alert
          style={{ textAlign: 'center', marginTop: '1em' }}
          type={isNear ? 'error' : 'info'}
          message={isNear ? `Take a photo!  📸` : `Get closer!`}
        />
      </div>
    );
  }
}
