import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbarContext } from 'contexts/SnackbarContext';
import { postDiaryPosting, postAnalysis } from 'api/api';
import FileUpload from 'components/modules/fileUpload/FileUpload';
import MainTitle from 'components/atoms/text/MainTitle';
import TextArea from 'components/atoms/textArea/TextArea';
import Button from 'components/atoms/button/Button';
import { IMAGE } from 'utils/image';
import { FileType } from 'types/atoms';
import { PostingContainer, Area, SubTitle, AlignRight } from './Posting.style';

function Posting() {
  const navigate = useNavigate();
  const { openSnackBar } = useSnackbarContext();
  const [simpleDiary, setSimpleDiary] = useState('');
  const [mindDiary, setMindDiary] = useState('');
  const [editImg, setEditImg] = useState({
    preview: `${IMAGE.IMG_UPLOAD_BASIC.url}`,
    data: '',
  });
  const formData = useMemo(() => new FormData(), [editImg]);

  const onChangeSimple = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSimpleDiary((cur) => e.target.value);
  };

  const onChangeMind = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMindDiary((cur) => e.target.value);
  };
  const onChangeFile = (fileData: FileType) => {
    setEditImg(fileData);
  };
  const onSubmit = async () => {
    const diaryData = {
      diary: simpleDiary,
      feeling: mindDiary,
    };
    formData.append('background', editImg.data);
    Object.entries(diaryData).forEach((val) => {
      formData.append(`${val[0]}`, JSON.stringify(val[1]));
    });
    try {
      const res = await postAnalysis({ diary: diaryData.feeling });
      formData.append('sentiment', JSON.stringify(res));
      await postDiaryPosting(formData);
      navigate('/result');
    } catch (e) {
      openSnackBar(false, '작성을 안 했어요..!!');
    }
  };

  const fileuploadPros = {
    editImg,
    onChangeFile,
  };

  return (
    <PostingContainer>
      <MainTitle>Daily Log</MainTitle>
      <FileUpload {...fileuploadPros} />
      <Area>
        <SubTitle>오늘 한 일</SubTitle>
        <TextArea onChange={onChangeSimple} />
      </Area>
      <Area>
        <SubTitle>오늘 느낀 감정</SubTitle>
        <TextArea onChange={onChangeMind} bgColor='red' />
      </Area>
      <AlignRight>
        <Button onClick={onSubmit}>Save & Analysis</Button>
      </AlignRight>
    </PostingContainer>
  );
}

export default Posting;
