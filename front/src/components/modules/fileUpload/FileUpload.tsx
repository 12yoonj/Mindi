import React from 'react';
import Image from 'components/atoms/image/Image';
import { FileProps } from 'types/atoms';
import { UploadFile, UploadFileLabel } from './FileUpload.style';
import { IMAGE } from 'utils/image';

function FileUpload({ editImg, onChangeFile }: FileProps) {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    onChangeFile(img);
  };
  return (
    <>
      <UploadFileLabel htmlFor='uploadFile'>
        <Image
          src={editImg.preview}
          alt={IMAGE.IMG_UPLOAD_BASIC.alt}
          width='100%'
          height='200px'
        />
      </UploadFileLabel>
      <UploadFile
        id='uploadFile'
        type='file'
        accept='image/*'
        onChange={onChange}
      />
    </>
  );
}

export default React.memo(FileUpload);
