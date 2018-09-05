import { test } from 'substance-test'
import { setCursor, LOREM_IPSUM } from './integrationTestHelpers'
import setupTestApp from './setupTestApp'

// TODO: instead of the kitchen-sink we should use a fixture that has a defined content
// so that we can write proper test assertions

test('FindAndReplace: open find dialog', t => {
  let { app } = setupTestApp(t, LOREM_IPSUM)
  let articlePanel = app.find('.sc-article-panel')
  articlePanel.send('updateViewName', 'manuscript')
  let editor = articlePanel.find('.sc-manuscript-editor')
  setCursor(editor, 'p-2.content', 290)
  // open findAndReplace dialog
  let fnr = editor.context.findAndReplaceManager
  fnr.openDialog()
  let fnrDialog = editor.find('.sc-find-and-replace-dialog')
  t.notNil(fnrDialog, 'The dialog should be rendered')
  t.notOk(fnrDialog.hasClass('sm-hidden'), '.. and should be visible')
  t.end()
})

test('FindAndReplace: simple search', t => {
  let { app } = setupTestApp(t, LOREM_IPSUM)
  let articlePanel = app.find('.sc-article-panel')
  articlePanel.send('updateViewName', 'manuscript')
  let editor = articlePanel.find('.sc-manuscript-editor')
  setCursor(editor, 'p-2.content', 290)
  // open findAndReplace dialog
  let fnr = editor.context.findAndReplaceManager
  fnr.openDialog()
  let fnrDialog = editor.find('.sc-find-and-replace-dialog')
  let input = fnrDialog.find('.sm-find input')
  input.val('Lorem')
  input.el.emit('input')
  let state = fnr._getState()
  t.equal(state.count, 19, 'The number of case-insensitive matches should be correct')
  t.end()
})
