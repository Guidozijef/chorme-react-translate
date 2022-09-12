/*global chrome*/
import { useState } from "react";
import "./content.css";


const Content = () => {

  const [ raw, setRaw ] = useState('')

  const [ translate, setTranslate ] = useState('')

  const [isModalVisible, setIsModalVisible] = useState(false);

  //监听鼠标的释放事件
  window.onmouseup = function (e) {
    // console.log('我松手了' , e)
    if (e.target.className === 'button-translate') return 
    //获取到用户选中的内容
    let text = window.getSelection().toString().trim()
    setRaw(text)
    if (text) {
      setIsModalVisible(true)
      //获取释放鼠标时，光标在页面上的位置

      let dom = document.querySelector('.CRX-antd-diy')
      dom.style.top = e.pageY - 30 + 'px'
      dom.style.left = e.pageX  + 'px'
    } else {
      setIsModalVisible(false)
      setRaw('')
      setTranslate('')
    }
  }

  document.onClick = function( e) {
    if (e.target.className === 'button-translate') return 
    setIsModalVisible(false)
    setTranslate('')
  }

  let onClick = (e) => {

    if (translate) return

    //谷歌翻译接口 sl：需要翻译的语言（en 英语） tl：需要翻译成哪种语言 (zh-Hans 中文) q：需要翻译的内容
    fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${'zh-CN'}&tl=${'en'}&dt=t&q=${raw}`)
    .then(res => res.json())
    .then(res => {
        setTranslate(res[0][0][0])
    })

    e.stopPropagation()

  }

  return (
    <div className="CRX-antd-diy">
      {
        isModalVisible &&  <button className="button-translate" onClick={onClick}>{  translate || '翻译' }</button>
      }
    </div>
  );
};

export default Content;
