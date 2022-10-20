import React, { useCallback, useEffect } from 'react'
import { initialize, changeField } from '../../modules/write'
import { useDispatch, useSelector } from 'react-redux'
import Editor from '../../components/write/Editor'

const EditorContainer = () => {
  const dispatch = useDispatch()
  const { title, body } = useSelector(({ write }) => ({
    title: write.title,
    body: write.body
  }))
  const onChangeField = useCallback(
    payload => dispatch(changeField(payload)),
    [dispatch]
  )
  //unmount
  useEffect(() => {
    return () => {
      dispatch(initialize())
    }
  }, [dispatch])
  return <Editor onChangeField={onChangeField} title={title} body={body} />
}

export default EditorContainer
