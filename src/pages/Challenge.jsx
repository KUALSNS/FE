import { Editor } from '@tinymce/tinymce-react';
import React, { useRef } from 'react';

function Challenge() {
  const editorRef = useRef(null);
  const onSubmitHandler = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }   
  };
  const onGetHandler = ()=>{
      if (editorRef.current) {
          console.log(editorRef.current.setContent('<p>예제 텍스트</p>'));
        }   
  }
  return (
    <>
      <Editor
        apiKey='g4mg3drbkngwjqktapnoov8l2rgl77uqi4ji7mr62mheiq20'
        onInit={(evt, editor) => editorRef.current = editor}
        placeholder='내용을 입력해주세요.'
        init={{
          height: 500,
          menubar: false,
          statusbar: false,
          plugins: 'autolink autosave save directionality image link',
          toolbar: 'styles fontsizeinput | bold italic underline strikethrough | image link | forecolor backcolor | removestyle ',
          editimage_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
          link_context_toolbar: true,
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      <button onClick={onSubmitHandler}>Submit</button>
      <button onClick={onGetHandler}>Get</button>
    </>
  );
}

export default Challenge