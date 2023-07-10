const ajaxRequest = (url, method, data) => {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: url,
        method: method,
        data: data,
        headers: {
          Authorization: localStorage.getItem('token'),
        },
        success: function (response) {
          resolve(response);
        },
        error: function (error) {
          console.log(error);
          alert(error.message);
          reject(error.message);
        },
      });
    });
  };
  