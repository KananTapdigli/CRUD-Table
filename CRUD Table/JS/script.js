$(document).ready(function () {

    // *******Showing AddUser Form*******

    let addButton = $('.addButton');
    let addUser = $('.addUser');
    let saveChangeBtnEdit = $('.saveChangeBtnEdit');


    addButton.on('click', function () {
        $('.inputsInAdd').each(function (index, element) {
            $(element).val('')
        });

        $('.formAlert').each(function (index, element) {
            $(element).hide()
        });

        $('.formAlertSpecial').hide()
        $('.formAlertSpecial2').hide()
        $('.addTitle').text('Add User');
        addUser.show();
        saveChangeBtnEdit.hide();
        saveChangeBtn.show();



        let isValid = true;
        let formAlertSpecial2 = $('.formAlertSpecial2')

        $(inputsInAdd[3]).on('keyup', function () {
            $('.tdEmail').each(function (index, element) {
                if ($(inputsInAdd[3]).val() == $(element).text()) {
                    isValid = false;
                }

                if (isValid == false) {
                    $('.formAlertSpecial2').show()
                    formAlertSpecial2.css('display', 'flex');
                } else {
                    formAlertSpecial2.css('display', 'none');
                }
            });
            isValid = true;
        })
    });

    // *********totalSalary********


    CalculatingTotalSalary()


    // *********ShowingAlerts***********

    let inputsInAdd = $('.inputsInAdd');
    let formAlerts = $('.formAlert');
    let formAlertSpecial = $('.formAlertSpecial');
    let saveChangeBtn = $('.saveChangeBtn');

    $(inputsInAdd).each(function (index, element) {
        $(element).on('keyup', function () {

            if ($(element).val() == '') {
                $(formAlerts[index]).css('display', 'flex');
                formAlertSpecial.css('display', 'none')
            } else {
                $(formAlerts[index]).css('display', 'none');
            }


            if ($(inputsInAdd[2]).val() < 0) {
                formAlertSpecial.css('display', 'flex')
            }


            if ($(inputsInAdd[0]).val().length > 0 &&
                $(inputsInAdd[1]).val().length > 0 &&
                $(inputsInAdd[2]).val().length > 0 &&
                $(inputsInAdd[3]).val().length > 0 &&
                $(formAlertSpecial).css('display') == 'none' &&
                $(inputsInAdd[3]).val().indexOf('@') > -1) {
                saveChangeBtn.css({
                    'cursor': 'pointer',
                    'opacity': '1',
                })
                saveChangeBtn.attr("disabled", false);
            } else {
                saveChangeBtn.css({
                    'cursor': 'not-allowed',
                    'opacity': '.65'
                })
                saveChangeBtn.attr("disabled", true);
            }
        })
    });


    // *********AddingNewTr***********

    GetAllUsersList()
    let obj = {};
    let counter = 1;


    saveChangeBtn.on('click', function () {


        let user = {
            Name: $('.inputsInAdd').eq(0).val(),
            Country: $('.inputsInAdd').eq(1).val(),
            Salary: $('.inputsInAdd').eq(2).val(),
            Email: $('.inputsInAdd').eq(3).val()
        }

        if (obj[`user - ${counter}`] == undefined) {
            obj[`user - ${counter}`] = [];
        }

        obj[`user - ${counter}`].push(user);

        localStorage.setItem('users', JSON.stringify(obj));

        counter++

        console.log(obj)



        let newTr = $(document.createElement('tr'));
        $(newTr).addClass('tr');

        let tdName = $(document.createElement('td'));
        $(tdName).addClass('tdName');
        $(tdName).text(inputsInAdd[0].value);


        let tdCountry = $(document.createElement('td'));
        $(tdCountry).addClass('tdCountry');
        $(tdCountry).text(inputsInAdd[1].value);

        let tdSalary = $(document.createElement('td'));
        $(tdSalary).addClass('tdSalary');
        $(tdSalary).text(inputsInAdd[2].value);

        let tdEmail = $(document.createElement('td'));
        $(tdEmail).addClass('tdEmail');
        $(tdEmail).text(inputsInAdd[3].value);

        let tdEdit = $(document.createElement('td'));
        $(tdEdit).addClass('tdEdit');

        let editButton = $(document.createElement('button'));
        $(editButton).addClass('editButton');
        $(editButton).text('Edit')

        let tdDelete = $(document.createElement('td'));
        $(tdDelete).addClass('tdDelete');

        let deleteButton = $(document.createElement('button'));
        $(deleteButton).addClass('deleteButton');
        $(deleteButton).text('Delete');

        $(tdDelete).append(deleteButton);
        $(tdEdit).append(editButton);
        $(newTr).append(tdName, tdCountry, tdSalary, tdEmail, tdEdit, tdDelete);
        $('.table').append(newTr);

        $(inputsInAdd).each(function (index, element) {
            element.value = '';
        });



        CalculatingTotalSalary()
        sortTable();
        RemovingTr()
        EditingTr()

    })


    function GetAllUsersList() {
        let localUser = localStorage.getItem('users');

        let obj = JSON.parse(localUser);
        console.log(obj)

        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const element = obj[key];
                console.log(element)
                $(element).each((index, e) => {
                    console.log(e)
                    $('tbody').append(`<tr class="tr">
                                    <td class="tdName">${e.Name}</td>
                                    <td class="tdCountry">${e.Country}</td>
                                    <td class="tdSalary">${e.Salary}</td>
                                    <td class="tdEmail">${e.Email}</td>
                                    <td class="tdEdit"><button class="editButton">Edit</button></td>
                                    <td class="tdDelete"><button class="deleteButton">Delete</button></td>
                                </tr>`)
                });
            }
            CalculatingTotalSalary()
            sortTable();
        }
    }

    RemovingTr()
    EditingTr()

    // **********First-BackgroundColorofTrs***********
    trs = $('.tr');
    $(trs).each(function (index, element) {
        if (index % 2 == 0) {
            $(element).css('background-color', '#F9F9F9')
        }
    });

    // **********BorderInputs***********
    $(inputsInAdd).each(function (index, element) {
        $(element).on('click', function () {
            $(inputsInAdd).each(function (index, element) {
                $(element).css({
                    'border-color': '#ccc',
                    'box-shadow': 'none',
                })
            })
            $(element).css({
                'border-color': '#66afe9',
                'box-shadow': 'inset 0 1px 1px rgba(0, 0, 0, .075)',
                'box-shadow': '0 0 8px rgba(102,175,233,.6)'
            })
        });
    });

    let isValid = true;
    let formAlertSpecial2 = $('.formAlertSpecial2')
    $(inputsInAdd[3]).on('keyup', function () {
        $('.tdEmail').each(function (index, element) {
            if ($(inputsInAdd[3]).val() == $(element).text()) {
                isValid = false;
            }

            if (isValid == false) {
                formAlertSpecial2.css('display', 'flex');
                saveChangeBtn.css({
                    'cursor': 'not-allowed',
                    'opacity': '.65'
                })
                saveChangeBtn.attr("disabled", true);
            } else {
                formAlertSpecial2.css('display', 'none');
            }
        });
        isValid = true;
    })

    function RemovingTr() {
        // ************RemovingTr************
        let DeleteBtns = $('.deleteButton');
        $(DeleteBtns).each(function (index, element) {
            $(element).on('click', function () {
                $(element).parent().parent().remove();

                // **********BackgroundColorofTrs***********
                trs = $('.tr');
                $(trs).each(function (index, element) {
                    if (index % 2 == 0) {
                        $(element).css('background-color', '#F9F9F9')
                    } else if (index % 2 != 0) {
                        $(element).css('background-color', 'white')
                    }
                });
                let totalSalary = 0;
                $('.tdSalary').each((index, element) => {
                    totalSalary = totalSalary + parseInt($(element).text(), 10);;
                });
                $('.tdSalaryTotal').text(totalSalary)
            })
        });
    }

    function EditingTr() {
        // ************EditingTr************

        let editBtns = $('.editButton')

        $(editBtns).on('click', function () {


            $('.addTitle').text('Edit User');
            $('.inputsInAdd').each(function (index, element) {
                $(element).val('')
            });
            $('.formAlert').each(function (index, element) {
                $(element).hide()
            });

            $('.formAlertSpecial').hide()
            $('.formAlertSpecial2').hide()

            $(addUser).show();
            $(saveChangeBtn).hide();
            $(saveChangeBtnEdit).show();


            $(inputsInAdd[0]).val($($(this).parent().parent().children()[0]).text())
            $(inputsInAdd[1]).val($($(this).parent().parent().children()[1]).text())
            $(inputsInAdd[2]).val($($(this).parent().parent().children()[2]).text())
            $(inputsInAdd[3]).val($($(this).parent().parent().children()[3]).text())

            click = $(this);

            $(inputsInAdd).each(function (index, element) {
                $(element).on('keyup', function () {
                    if ($(inputsInAdd[0]).val().length > 0 && $(inputsInAdd[1]).val().length > 0 && $(inputsInAdd[2]).val().length > 0 && $(inputsInAdd[3]).val().length > 0 && $(formAlertSpecial).css('display') == 'none' && $(inputsInAdd[3]).val().indexOf('@') > -1) {
                        saveChangeBtnEdit.css({
                            'cursor': 'pointer',
                            'opacity': '1',
                        })
                        saveChangeBtnEdit.attr("disabled", false);
                    } else {
                        saveChangeBtnEdit.css({
                            'cursor': 'not-allowed',
                            'opacity': '.65'
                        })
                        saveChangeBtnEdit.attr("disabled", true);
                    }
                })
            });

        })
    }

    let click;
    $(saveChangeBtnEdit).on('click', function () {

        $($(click).parent().parent().children()[0]).text($(inputsInAdd[0]).val())
        $($(click).parent().parent().children()[1]).text($(inputsInAdd[1]).val())
        $($(click).parent().parent().children()[2]).text($(inputsInAdd[2]).val())
        $($(click).parent().parent().children()[3]).text($(inputsInAdd[3]).val())

        $(addUser).hide();


        let totalSalary = 0;
        $('.tdSalary').each((index, element) => {
            totalSalary = totalSalary + parseInt($(element).text(), 10);;
        });
        $('.tdSalaryTotal').text(totalSalary)
    })

    function Searching() {
        $('.searchInput').on("keyup", function () {
            let value = $('.searchInput').val().toLowerCase().trim();
            $(".tr>td:first-child").filter(function () {
                $(this).parent().toggle($(this).text().toLowerCase().trim().indexOf(value) > -1)
            });

            // **********BackgroundColorofTrs***********
            visibleTrs = $('.tr:visible')
            $(visibleTrs).each(function (index, element) {
                if (index % 2 == 0) {
                    $(element).css('background-color', '#F9F9F9')
                } else if (index % 2 != 0) {
                    $(element).css('background-color', 'white')
                }
            });
        });
    }


    function sortTable() {
        // *********SortingTable***********
        let rows = $('.tr');

        rows.sort(function (a, b) {

            var A = $(a).children('td').eq(0).text().toUpperCase();
            var B = $(b).children('td').eq(0).text().toUpperCase();

            if (A < B) {
                return -1;
            }

            if (A > B) {
                return 1;
            }

            return 0;

        });

        $.each(rows, function (index, row) {
            $('.table').children('tbody').append(row);
        });
    }

    function CalculatingTotalSalary() {
        let totalSalary = 0;
        $('.tdSalary').each((index, element) => {
            totalSalary = totalSalary + parseInt($(element).text());;
        });
        $('.tdSalaryTotal').text(totalSalary)
    }

    Searching()

})