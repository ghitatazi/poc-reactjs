

let getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie != '') {
        let cookies = document.cookie.split(';');
        // cookies.forEach(c => {})
        for (let c in cookies) {
          let cookie = $.trim(c);
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
          }
        }
    }
    return cookieValue;
}

export default getCookie;
