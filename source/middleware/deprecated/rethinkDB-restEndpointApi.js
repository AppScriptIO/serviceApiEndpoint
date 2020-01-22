"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _rethinkdb = _interopRequireDefault(require("rethinkdb"));
var _koaCompose = _interopRequireDefault(require("koa-compose"));var _default =


urlPrefix => {
  return (0, _koaCompose.default)([
  async (context, next) => {
    if (context.request.method != 'GET') return await next();
    console.log('SZN - Inside GET <REST API>/*');
    let url = context.request.url;
    url = url.replace((void 0).urlPrefix, '');
    url = url.substring(url).split('?')[0];
    let pathArray = url.split('/').filter(x => x);
    let lastPath = pathArray.slice(-1)[0];
    pathArray[pathArray.length - 1] = lastPath.slice(0, lastPath.indexOf('.'));
    if (lastPath.substr(lastPath.indexOf('.') + 1) != 'json') return await next();

    context.status = 200;



    let query = _rethinkdb.default.table(pathArray[0]);

    pathArray.shift();



    if (pathArray[0]) query = query.withFields(pathArray[0])(pathArray[0]);
    pathArray.shift();
    pathArray.forEach(pathSection => query = query(pathSection));

    query = query.run(context.rethinkdbConnection);

    if (!pathArray[1] || true) {
      query = query.then(cursor => {
        return cursor.toArray();
      });
    }

    await query.
    then(result => {
      context.body = result;
    }).
    catch(error => {
      throw error;
    });

    return;
  }]);

};exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NvdXJjZS9taWRkbGV3YXJlL2RlcHJlY2F0ZWQvcmV0aGlua0RCLXJlc3RFbmRwb2ludEFwaS5qcyJdLCJuYW1lcyI6WyJ1cmxQcmVmaXgiLCJjb250ZXh0IiwibmV4dCIsInJlcXVlc3QiLCJtZXRob2QiLCJjb25zb2xlIiwibG9nIiwidXJsIiwicmVwbGFjZSIsInN1YnN0cmluZyIsInNwbGl0IiwicGF0aEFycmF5IiwiZmlsdGVyIiwieCIsImxhc3RQYXRoIiwic2xpY2UiLCJsZW5ndGgiLCJpbmRleE9mIiwic3Vic3RyIiwic3RhdHVzIiwicXVlcnkiLCJyIiwidGFibGUiLCJzaGlmdCIsIndpdGhGaWVsZHMiLCJmb3JFYWNoIiwicGF0aFNlY3Rpb24iLCJydW4iLCJyZXRoaW5rZGJDb25uZWN0aW9uIiwidGhlbiIsImN1cnNvciIsInRvQXJyYXkiLCJyZXN1bHQiLCJib2R5IiwiY2F0Y2giLCJlcnJvciJdLCJtYXBwaW5ncyI6InlMQUFBO0FBQ0EsaUU7OztBQUdnQkEsU0FBRCxJQUFlO0FBQzFCLFNBQU8seUJBQVE7QUFDYixTQUFPQyxPQUFQLEVBQWdCQyxJQUFoQixLQUF5QjtBQUN2QixRQUFJRCxPQUFPLENBQUNFLE9BQVIsQ0FBZ0JDLE1BQWhCLElBQTBCLEtBQTlCLEVBQXFDLE9BQU8sTUFBTUYsSUFBSSxFQUFqQjtBQUNyQ0csSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksK0JBQVo7QUFDQSxRQUFJQyxHQUFHLEdBQUdOLE9BQU8sQ0FBQ0UsT0FBUixDQUFnQkksR0FBMUI7QUFDQUEsSUFBQUEsR0FBRyxHQUFHQSxHQUFHLENBQUNDLE9BQUosQ0FBWSxTQUFLUixTQUFqQixFQUE0QixFQUE1QixDQUFOO0FBQ0FPLElBQUFBLEdBQUcsR0FBR0EsR0FBRyxDQUFDRSxTQUFKLENBQWNGLEdBQWQsRUFBbUJHLEtBQW5CLENBQXlCLEdBQXpCLEVBQThCLENBQTlCLENBQU47QUFDQSxRQUFJQyxTQUFTLEdBQUdKLEdBQUcsQ0FBQ0csS0FBSixDQUFVLEdBQVYsRUFBZUUsTUFBZixDQUFzQkMsQ0FBQyxJQUFJQSxDQUEzQixDQUFoQjtBQUNBLFFBQUlDLFFBQVEsR0FBR0gsU0FBUyxDQUFDSSxLQUFWLENBQWdCLENBQUMsQ0FBakIsRUFBb0IsQ0FBcEIsQ0FBZjtBQUNBSixJQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQ0ssTUFBVixHQUFtQixDQUFwQixDQUFULEdBQWtDRixRQUFRLENBQUNDLEtBQVQsQ0FBZSxDQUFmLEVBQWtCRCxRQUFRLENBQUNHLE9BQVQsQ0FBaUIsR0FBakIsQ0FBbEIsQ0FBbEM7QUFDQSxRQUFJSCxRQUFRLENBQUNJLE1BQVQsQ0FBZ0JKLFFBQVEsQ0FBQ0csT0FBVCxDQUFpQixHQUFqQixJQUF3QixDQUF4QyxLQUE4QyxNQUFsRCxFQUEwRCxPQUFPLE1BQU1mLElBQUksRUFBakI7O0FBRTFERCxJQUFBQSxPQUFPLENBQUNrQixNQUFSLEdBQWlCLEdBQWpCOzs7O0FBSUEsUUFBSUMsS0FBSyxHQUFHQyxtQkFBRUMsS0FBRixDQUFRWCxTQUFTLENBQUMsQ0FBRCxDQUFqQixDQUFaOztBQUVBQSxJQUFBQSxTQUFTLENBQUNZLEtBQVY7Ozs7QUFJQSxRQUFJWixTQUFTLENBQUMsQ0FBRCxDQUFiLEVBQWtCUyxLQUFLLEdBQUdBLEtBQUssQ0FBQ0ksVUFBTixDQUFpQmIsU0FBUyxDQUFDLENBQUQsQ0FBMUIsRUFBK0JBLFNBQVMsQ0FBQyxDQUFELENBQXhDLENBQVI7QUFDbEJBLElBQUFBLFNBQVMsQ0FBQ1ksS0FBVjtBQUNBWixJQUFBQSxTQUFTLENBQUNjLE9BQVYsQ0FBa0JDLFdBQVcsSUFBS04sS0FBSyxHQUFHQSxLQUFLLENBQUNNLFdBQUQsQ0FBL0M7O0FBRUFOLElBQUFBLEtBQUssR0FBR0EsS0FBSyxDQUFDTyxHQUFOLENBQVUxQixPQUFPLENBQUMyQixtQkFBbEIsQ0FBUjs7QUFFQSxRQUFJLENBQUNqQixTQUFTLENBQUMsQ0FBRCxDQUFWLElBQWlCLElBQXJCLEVBQTJCO0FBQ3pCUyxNQUFBQSxLQUFLLEdBQUdBLEtBQUssQ0FBQ1MsSUFBTixDQUFXQyxNQUFNLElBQUk7QUFDM0IsZUFBT0EsTUFBTSxDQUFDQyxPQUFQLEVBQVA7QUFDRCxPQUZPLENBQVI7QUFHRDs7QUFFRCxVQUFNWCxLQUFLO0FBQ1JTLElBQUFBLElBREcsQ0FDRUcsTUFBTSxJQUFJO0FBQ2QvQixNQUFBQSxPQUFPLENBQUNnQyxJQUFSLEdBQWVELE1BQWY7QUFDRCxLQUhHO0FBSUhFLElBQUFBLEtBSkcsQ0FJR0MsS0FBSyxJQUFJO0FBQ2QsWUFBTUEsS0FBTjtBQUNELEtBTkcsQ0FBTjs7QUFRQTtBQUNELEdBM0NZLENBQVIsQ0FBUDs7QUE2Q0QsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByIGZyb20gJ3JldGhpbmtkYidcbmltcG9ydCBjb21wb3NlIGZyb20gJ2tvYS1jb21wb3NlJ1xuXG4vLyBFWEFNUExFOiBob3N0L2FwaS92MS88dGFibGVOYW1lPi88aGF2aW5nRmllbGQ+LzxzdWJmaWVsZC1yZWN1cnNpdmU+Lmpzb25cbmV4cG9ydCBkZWZhdWx0ICh1cmxQcmVmaXgpID0+IHtcbiAgICByZXR1cm4gY29tcG9zZShbXG4gICAgICBhc3luYyAoY29udGV4dCwgbmV4dCkgPT4ge1xuICAgICAgICBpZiAoY29udGV4dC5yZXF1ZXN0Lm1ldGhvZCAhPSAnR0VUJykgcmV0dXJuIGF3YWl0IG5leHQoKSAvLyBpZiBub3QgR0VUXG4gICAgICAgIGNvbnNvbGUubG9nKCdTWk4gLSBJbnNpZGUgR0VUIDxSRVNUIEFQST4vKicpXG4gICAgICAgIGxldCB1cmwgPSBjb250ZXh0LnJlcXVlc3QudXJsIC8vIHVybCBwYXRoIHdpdGggcGFyYW1ldGVyc1xuICAgICAgICB1cmwgPSB1cmwucmVwbGFjZSh0aGlzLnVybFByZWZpeCwgJycpIC8vIHJlbW92ZSBwcmVmaXhcbiAgICAgICAgdXJsID0gdXJsLnN1YnN0cmluZyh1cmwpLnNwbGl0KCc/JylbMF0gLy8gcmVtb3ZlIHF1ZXJ5IHBhcmFtZXRlcnNcbiAgICAgICAgbGV0IHBhdGhBcnJheSA9IHVybC5zcGxpdCgnLycpLmZpbHRlcih4ID0+IHgpIC8vIHBhdGggc2VjdGlvbnMgYXJyYXlcbiAgICAgICAgbGV0IGxhc3RQYXRoID0gcGF0aEFycmF5LnNsaWNlKC0xKVswXSAvLyBnZXQgbGFzdCBhcnJheSBlbGVtZW50XG4gICAgICAgIHBhdGhBcnJheVtwYXRoQXJyYXkubGVuZ3RoIC0gMV0gPSBsYXN0UGF0aC5zbGljZSgwLCBsYXN0UGF0aC5pbmRleE9mKCcuJykpIC8vIHJlbW92ZSAuanNvbiBlbmRpbmdcbiAgICAgICAgaWYgKGxhc3RQYXRoLnN1YnN0cihsYXN0UGF0aC5pbmRleE9mKCcuJykgKyAxKSAhPSAnanNvbicpIHJldHVybiBhd2FpdCBuZXh0KCkgLy8gaWYgd2l0aG91dCAuanNvbiBlbmRpbmdcblxuICAgICAgICBjb250ZXh0LnN0YXR1cyA9IDIwMFxuXG4gICAgICAgIC8vIC53aXRoRmllbGRzKCdkb21haW5zJykoJ2RvbWFpbnMnKSgneGNvbScpKCdwYXRoJylcblxuICAgICAgICBsZXQgcXVlcnkgPSByLnRhYmxlKHBhdGhBcnJheVswXSkgLy8gZmlyc3QgZmllbGQgYXNzaWducyBuYW1lIG9mIHRhYmxlXG5cbiAgICAgICAgcGF0aEFycmF5LnNoaWZ0KClcblxuICAgICAgICAvLyBpZihwYXRoQXJyYXlbMV0pIHF1ZXJ5ID0gcXVlcnkuZ2V0KHBhdGhBcnJheVsxXSlcblxuICAgICAgICBpZiAocGF0aEFycmF5WzBdKSBxdWVyeSA9IHF1ZXJ5LndpdGhGaWVsZHMocGF0aEFycmF5WzBdKShwYXRoQXJyYXlbMF0pXG4gICAgICAgIHBhdGhBcnJheS5zaGlmdCgpXG4gICAgICAgIHBhdGhBcnJheS5mb3JFYWNoKHBhdGhTZWN0aW9uID0+IChxdWVyeSA9IHF1ZXJ5KHBhdGhTZWN0aW9uKSkpXG5cbiAgICAgICAgcXVlcnkgPSBxdWVyeS5ydW4oY29udGV4dC5yZXRoaW5rZGJDb25uZWN0aW9uKVxuXG4gICAgICAgIGlmICghcGF0aEFycmF5WzFdIHx8IHRydWUpIHtcbiAgICAgICAgICBxdWVyeSA9IHF1ZXJ5LnRoZW4oY3Vyc29yID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjdXJzb3IudG9BcnJheSgpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IHF1ZXJ5XG4gICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIGNvbnRleHQuYm9keSA9IHJlc3VsdFxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIHRocm93IGVycm9yXG4gICAgICAgICAgfSlcblxuICAgICAgICByZXR1cm5cbiAgICAgIH0sXG4gICAgXSlcbiAgfVxuXG4iXX0=