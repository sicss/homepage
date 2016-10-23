var CjkNewlineRemover;

(function () {

  var cjkRegexStr = "[\\u3000-\\u303f\\u3040-\\u309f\\u30a0-\\u30ff\\uff00-\\uff9f\\u4e00-\\u9faf\\u3400-\\u4dbf]";
  var cjkRegexStrComp = "[\\u3000-\\u303f\\u3040-\\u309f\\u30a0-\\u30ff\\uff00-\\uff9f\\u4e00-\\u9faf\\u3400-\\u4dbf$]";

  var regex1 = new RegExp("("+cjkRegexStr+")\\s*\n\\s*("+cjkRegexStrComp+")", "g");
  var regex2 = new RegExp("("+cjkRegexStrComp+")\\s*\n\\s*("+cjkRegexStr+")", "g");

  var processNode = function (node) {
    if (node === undefined || node.nodeType === undefined) {
      // noop
    } else if (node.nodeType == 3) {
      // for text node
      var oldText = node.data;
      var newText = oldText.replace(regex1, "$1$2").replace(regex2, "$1$2");
      node.data = newText;
      console.log(oldText);
      console.log(newText);
    } else if (node.nodeType == 1) {
      // for element node
      Array.from(node.childNodes).forEach(processNode);
    }
  };

  CjkNewlineRemover = {
    processParagraphs: function () { Array.from(document.getElementsByTagName("p")).forEach(processNode); }
  };

})();

