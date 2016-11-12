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

        it('feed URLs are defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            })
        });

        it('feed names are defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            })
        });
    });

    describe('The menu', function() {

        it('menu is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });

        it('menu is visible on click', function() {
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