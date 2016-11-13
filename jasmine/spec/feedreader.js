/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /**
         * We are testing whether the feed propery is defined
         * we will wrap it method in for loop to verify each feed individually to see which feed fails
         * @param {Object} feed
         * @param {String} property
         * @return {Number} sum
         */
        function testEachFeedDefinition(feed, property) {
            it('feed\'s with id=' + feed['id'] + ' ' + property + ' is defined', function() {
                expect(feed[property]).toBeDefined();
                expect(feed[property].length).not.toBe(0);
            });
        }

        // Loop to verify each feed in allFeeds
        allFeeds.forEach(function(feed) {
            testEachFeedDefinition(feed, 'url');
            testEachFeedDefinition(feed, 'name');
        });

    });

    describe('The menu', function() {

        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });

        it('is visible on click', function() {
            var menuIcon = $('.menu-icon-link');

            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).not.toEqual(true);

            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });
    });

    describe('Initial Entries', function() {

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('feed container has elements', function() {
            expect($('.feed .entry').length).not.toBe(0);
        });
    });

    describe('New Feed Selection', function() {

        var articles;

        beforeEach(function(done) {
            loadFeed(0, function() {
                articles = $('.feed').html();
                done();
            });
        });

        it('feed container updates', function(done) {
            var articlesToCompare;

            loadFeed(1, function() {
                articlesToCompare = $('.feed').html();
                expect(articles).not.toEqual(articlesToCompare);
                done();
            });
        });
    });
}());