'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    queryInterface.bulkInsert('Orders', [
      {
        quantity: 200.03,
        paymentAmount: 513.22,
        deliveryMethod: 'self',
        growerId: 3,
        consumerId: 2,
        gigId: 2,
        qrLink:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAAT/SURBVO3BQY4bSRAEwfAC//9l3znmqYBGJweSNszwR6qWnFQtOqladFK16KRq0UnVopOqRSdVi06qFp1ULTqpWnRSte\n' +
          'ikatFJ1aKTqkUnVYs+eQnIb1LzBpAbNU8AeULNBGRSMwH5TWreOKladFK16KRq0SfL1GwC8gaQSc0TQJ5QMwG5UfOEmk1ANp1ULTqpWnRSteiTLwPyhJongExqJjVvqJmATGpu1ExAJjVvAHlCzTedVC06qVp0UrXok38ckBs1E5BJzaTmBs\n' +
          'ikZlIzAZnU/M1OqhadVC06qVr0yT8GyBtqboDcqJmA/J+cVC06qVp0UrXoky9T85vUvAFkUnOj5kbNDZA31PxJTqoWnVQtOqla9MkyIH8SIJOaCcikZgIyqZmATGomIJOaN4D8yU6qFp1ULTqpWvTJS2r+JEAmNTdqbtTcqPkmNX+Tk6pFJ1\n' +
          'WLTqoWffISkEnNBGSTmknNBOQJIDdqJiCb1NwA2aTmm06qFp1ULTqpWoQ/8kVAnlDzBJBJzQ2QN9RMQCY1E5BNaiYgk5ongExq3jipWnRSteikahH+yAtAJjU3QCY1E5AbNU8AmdRMQG7UTEDeUDMBmdRMQJ5QMwGZ1HzTSdWik6pFJ1WLPl\n' +
          'kGZFJzA2RSs0nNBGRSs0nNBOQJIJOaGyATkEnNDZBJzRsnVYtOqhadVC365CU1E5AbNROQCciNmhsgk5pJzQ2QSc2NmgnIDZBJzQTkBsik5gbIpOabTqoWnVQtOqla9MkvA3Kj5gbIG0AmNZOaCcikZgJyo2YCMgG5ATKpmYDcqJmAfNNJ1a\n' +
          'KTqkUnVYvwR74IyCY1E5AbNTdAbtRMQN5QMwG5UfM3OaladFK16KRq0ScvAblRswnIpOYGyKRmUnMDZFIzAZnUTEDeADKpuQEyqZmA3Kh546Rq0UnVopOqRZ98GZAn1ExAJjU3QCY1E5BJzQTkBsgNkDfU3ACZ1ExqJiA3ajadVC06qVp0Ur\n' +
          'UIf+QFIJOaCcikZgJyo+YGyKRmArJJzQRkUnMD5A01E5AbNROQGzVvnFQtOqladFK16JNfBmRSMwGZgExqboBMam6ATGomIBOQGyA3aiYgN2pu1ExAnlCz6aRq0UnVopOqRfgjLwCZ1NwAeULNBOQNNU8AmdRMQCY1E5AbNTdAJjUTkBs1N0\n' +
          'AmNW+cVC06qVp0UrXokz+MmgnIpGYCMqm5ATKpuVFzo2YCcqNmAvIEkCeA/KaTqkUnVYtOqhbhj/zFgNyoeQLIpOYGyCY1TwCZ1DwBZFLzxknVopOqRSdViz55CchvUjOpeQPIDZAbNU8AeQLIpOYJIJOaSc2mk6pFJ1WLTqoWfbJMzSYgN0\n' +
          'AmNU+omYBMat4A8oaaJ4BMan7TSdWik6pFJ1WLPvkyIE+o+U1AJjUTkE1qJiATkDfU3AC5UfPGSdWik6pFJ1WLPvnHAHkDyKTmBsikZgLyhJpNQH7TSdWik6pFJ1WLPvnHqJmA3KiZgExAngByA+QGyI2aCciNmgnIpGbTSdWik6pFJ1WLPv\n' +
          'kyNd+kZgIyqZmA3Kh5AsikZgIyqZmATGomIH+Tk6pFJ1WLTqoWfbIMyG8CMqm5UfMEkBs1E5BJzQRkUvMEkBs1E5BJzTedVC06qVp0UrUIf6RqyUnVopOqRSdVi06qFp1ULTqpWnRSteikatFJ1aKTqkUnVYtOqhadVC06qVp0UrXoP+ebWE\n' +
          'oq+uWVAAAAAElFTkSuQmCC',
        growerFname: 'Anjana',
        growerLname: 'Dodampe',
        gigTitle: 'Radish',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        quantity: 200.03,
        paymentAmount: 513.22,
        deliveryMethod: 'seller',
        growerId: 3,
        consumerId: 2,
        gigId: 1,
        qrLink:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAAT9SURBVO3BQY4bSRAEwfAC//9l3znmqYBGJ4XRKszwR6qWnFQtOqladFK16KRq0UnVopOqRSdVi06qFp1ULTqpWnRSte\n' +
          'ikatFJ1aKTqkUnVYs+eQnIn6TmDSCTmjeAPKFmAjKpmYD8SWreOKladFK16KRq0SfL1GwC8gaQGyCTmgnIE2omIDdqnlCzCcimk6pFJ1WLTqoWffJlQJ5Q8wSQSc2k5gbIjZoJyKTmRs0EZFLzBpAn1HzTSdWik6pFJ1WLPvnHAJnUTEAmNZ\n' +
          'OaGyCTmknNBGRS8zc7qVp0UrXopGrRJ/9zQG6ATGpugNyomYD8S06qFp1ULTqpWvTJl6n5TdTcAJnU3Ki5UXMD5A01v8lJ1aKTqkUnVYs+WQbkbwJkUjMBmdRMQCY1E5BJzRtAfrOTqkUnVYtOqhZ98pKa30zNBGRSc6PmRs03qfmbnFQtOq\n' +
          'ladFK16JOXgExqJiCb1ExqNgGZ1ExANqm5AbJJzTedVC06qVp0UrXoky9TcwNkUvMEkCfUPAFkUjMBmdRMQCYgb6iZgExqngAyqXnjpGrRSdWik6pFn3wZkBs1N0AmNW8AeULNBOQGyI2aCcikZgJyo+YGyKRmUrPppGrRSdWik6pFn7ykZg\n' +
          'IyqbkBMqmZ1NyouQHyhJo31ExAngAyqbkBcqPmBsik5o2TqkUnVYtOqhZ98hKQSc0NkBsgT6iZgDyhZgIyqblRMwG5ATKpmYDcAJnU3ACZ1HzTSdWik6pFJ1WL8EdeAHKjZgJyo+YGyI2aCcgTaiYgk5oJyI2aCcgbaiYgN2omIDdq3jipWn\n' +
          'RSteikatEnXwbkRs0E5EbNBOQJNTdAJjUTkCeATGomIDdqbtQ8oeabTqoWnVQtOqlahD+yCMikZgJyo+Y3ATKpmYBMaiYgk5oJyBNqboBMaiYgN2reOKladFK16KRq0Se/DJAn1DwB5A0gN0DeUHMDZFIzqZmA3KjZdFK16KRq0UnVok9eAv\n' +
          'KGmgnIpGaTmhsgN2omIJOaGyA3QG7UTEBu1ExAJiCTmjdOqhadVC06qVqEP/ICkEnNBOQJNROQb1JzA2STmgnIjZongExqJiCTmk0nVYtOqhadVC365MvU3AC5UTMBmdS8AWRSc6NmAjKpmYBMQCY1N0AmNROQJ9RMQCY1b5xULTqpWnRStQ\n' +
          'h/5AUgk5oJyI2aCcgbam6ATGo2AblRMwH5TdS8cVK16KRq0UnVok9eUnOj5gk1TwDZBGRScwPkCSA3ap4AMql5Asimk6pFJ1WLTqoWffISkD9JzaRmAnKjZgJyA+RGzRNAngAyqXkCyKRmUrPppGrRSdWik6pFnyxTswnIDZBJzQ2QSc0EZF\n' +
          'LzBpA31DwBZFLzJ51ULTqpWnRSteiTLwPyhJo3gLyhZgKySc0EZALyhpobIDdq3jipWnRSteikatEn/xg1E5BJzaTmBsikZgLyhJpNQP6kk6pFJ1WLTqoWffI/o+YJNROQSc0E5AbIDZAbIDdqJiA3aiYgk5pNJ1WLTqoWnVQt+uTL1HyTmg\n' +
          'nIpGYCMqm5ATKpmYBMaiYgk5oJyKRmAvI3OaladFK16KRqEf7IC0D+JDUTkEnNJiA3aiYgk5oJyKTmBsgTaiYgk5pvOqladFK16KRqEf5I1ZKTqkUnVYtOqhadVC06qVp0UrXopGrRSdWik6pFJ1WLTqoWnVQtOqladFK16KRq0X9YbWA21c\n' +
          'lA/wAAAABJRU5ErkJggg==',
        growerFname: 'Anjana',
        growerLname: 'Dodampe',
        gigTitle: 'Carrot',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),
  down: async (queryInterface, Sequelize) =>
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    queryInterface.bulkDelete('Orders', null, {}),
};
