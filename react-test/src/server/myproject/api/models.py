from django.db import models


class Feed(models.Model):
    """Flux de données."""

    name = models.CharField(max_length=100, default='Feed simple')
    description = models.TextField(blank=True, default='')
    create_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        """Représentation par défaut."""
        return self.name


class Datapoint(models.Model):
    """Point de données."""

    timestamp = models.IntegerField()
    value = models.FloatField()
    feed = models.ForeignKey(
        Feed,
        null=True,
        on_delete=models.CASCADE,
        related_name='datapoints'
    )

    def __str__(self):
        """Représentation par défaut"""
        return str(self.timestamp) + " : " + str(self.value)
