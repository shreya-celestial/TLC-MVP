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

export const compareTwoArrays = function (array1, array2, by) {
  let isEvery;
  for (let i = 0; i < array2.length; i++) {
    isEvery = array1.every((existingVolunteer) => {
      console.log(existingVolunteer[by], array1[i][by]);
      return existingVolunteer[by] !== array2[i][by];
    });
  }
  return isEvery;
};
