$(document).ready(function () {
    var trivia = {

        correct: 0,
        incorrect: 0,
        unanswered: 0,
        currentSet: 0,
        timer: 20,
        timerOn: false,
        timerId: '',

        questions: {
            q1: "What color was Monica's apartment ?",
            q2: 'Who put a turkey on their head?',
            q3: "How many main characters were there ?",
            q4: 'What did Phoebe find in her can of soda?',
            q5: "How many seasons of friends were there ?",
        },

        choices: {

            q1: ["black", "purple", "pink", "brown"],
            q2: ['Ross', 'Monica', 'Chandler', 'Joey'],
            q3: ["3", "4", "5", "6"],
            q4: ['a toe', 'a pinky', 'a thumb', 'a pickle'],
            q5: ["10", "7", "9", "11"],
        },

        answers: {
            q1: "purple",
            q2: "Monica",
            q3: "6",
            q4: "a thumb",
            q5: "10",
        },
        startGame: function () {
            trivia.currentSet = 0;
            trivia.correct = 0;
            trivia.incorrect = 0;
            trivia.unanswered = 0;
            clearInterval(trivia.timerId);
            $('#trivia_info').show();

            $('#results').html('');

            $('#timer').text(trivia.timer);
            $('#start').hide();

            $('#remaining-time').show();
            trivia.nextQuestion();
        },
        nextQuestion: function () {

            trivia.timer = 10;
            $('#timer').removeClass('last-seconds');
            $('#timer').text(trivia.timer);
            if (!trivia.timerOn) {
                trivia.timerId = setInterval(trivia.timerRunning, 1000);
            }
            var questionContent = Object.values(trivia.questions)[trivia.currentSet];
            $('#question').text(questionContent);
            var questionOptions = Object.values(trivia.choices)[trivia.currentSet];
            $.each(questionOptions, function (_index, key) {
                $('#options').append($('<button class="option btn btn-info btn-lg">' + key + '</button>'));

            })
            $("#options").on("click", function () {
                console.log()

            })
        },

        timerRunning: function () {

            if (trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length) {
                $('#timer').text(trivia.timer);
                trivia.timer--;
                if (trivia.timer === 4) {
                    $('#timer').addClass('last-seconds');
                }
            } else if (trivia.timer === -1) {
                trivia.unanswered++;
                trivia.result = false;
                clearInterval(trivia.timerId);
                resultId = setTimeout(trivia.guessResult, 1000);
                $('#results').html('<h3>Out of time! The answer was ' + Object.values(trivia.answers)[trivia.currentSet] + '</h3>');
            }
            else if (trivia.currentSet === Object.values(trivia.questions).length) {


                $('#results')
                    .html('<h3>Thank you for playing!</h3>' +
                        '<p>Correct: ' + trivia.correct + '</p>' +
                        '<p>Incorrect: ' + trivia.incorrect + '</p>' +
                        '<p>Unaswered: ' + trivia.unanswered + '</p>' +
                        '<p>Please play again!</p>');

                $('#trivia_info').hide();
                $('#Reset').show();

            }
        },
        answerCheck: function () {
            var currentAnswer = $(this).Object.values(trivia.answers)
            [trivia.currentSet];
            if ($(this).text() === currentAnswer) {
                $(this).addClass('btn-success').removeClass('btn-info');

                
                clearInterval(trivia.timerId);
                resultId = setTimeout(trivia.guessResult, 1000);
                $('#results').html('<h3>Correct Answer!</h3>');
                trivia.correct++;
            }
            else {
                $(currentAnswer).addClass('btn-danger').removeClass('btn-info');

               
                clearInterval(trivia.timerId);
                resultId = setTimeout(trivia.guessResult, 1000);
                $('#results').html('<h3>Better luck next time! ' + currentAnswer + '</h3>');
                trivia.incorrect++;

            }

        },
        guessResult: function () {
            $('.option').remove();
            $('#results h3').remove();
            trivia.nextQuestion();
        }
    }
    $("#Reset").hide();
    $("#start").on("click", trivia.startGame);
    $("#remainingTime").hide();
});

























