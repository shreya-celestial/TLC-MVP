export function getCookie(name) {
  var cookies = document.cookie.split(';');

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();

    if (cookie.indexOf(name + '=') === 0) {
      return cookie.substring(name.length + 1);
    }
  }

  return null;
}

export function deleteCookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

export const compareTwoArrays = function (existingRows, newRows, by) {
  let isEvery = true;
  for (let i = 0; i < existingRows.length; i++) {
    for (let j = 0; j < newRows.length; j++) {
      if (existingRows[i][by] === newRows[j][by]) {
        isEvery = false;
        break;
      }
    }
  }
  return isEvery;
};
