define([], function() {
  'use strict';
  // this is a simple sanity check to verify
  // that the test framwork is up and running
  describe('sanity check', function() {
    it('should pass', function() {
    <% if (testFramework === 'jasmine') { %>
      expect(1).toEqual(1);
    <% } else { %>
      expect(1).to.equal(1);
    <% } %>
    });
  });
});
