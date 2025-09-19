public with sharing class ClosedWonSummaryController {

    @AuraEnabled(cacheable=true)
    public static Map<String, Decimal> getClosedWonSummary() {
        Map<String, Decimal> results = new Map<String, Decimal>();

        results.put('Yesterday', getAggregate('YESTERDAY'));
        results.put('Today', getAggregate('TODAY'));
        results.put('ThisMonth', getAggregate('THIS_MONTH'));
        results.put('LastMonth', getAggregate('LAST_MONTH'));
        results.put('ThisYear', getAggregate('THIS_YEAR'));
        results.put('LastYear', getAggregate('LAST_YEAR'));

        return results;
    }

    private static Decimal getAggregate(String dateLiteral) {
        List<AggregateResult> ars = Database.query(
            'SELECT SUM(Amount) total FROM Opportunity ' +
            'WHERE StageName = \'Closed Won\' ' +
            'AND CloseDate = ' + dateLiteral
        );
        if (ars.isEmpty()) {
            return 0;
        }
        Object val = ars[0].get('total');
        return val == null ? 0 : (Decimal) val;
    }
}
