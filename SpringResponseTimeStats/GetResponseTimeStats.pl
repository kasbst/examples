#!/usr/bin/env perl

use strict;
use warnings;
use Data::Dumper;
use Getopt::Std;
use File::Copy "cp";
use File::Basename;
use POSIX 'strftime';

sub GetStatistics {
    open(FILE, "/opt/application/logs/performance.log");

    my $Stats = {};

    my @array = <FILE>;
    foreach my $temp (@array) {
       chomp $temp;

       if ($temp =~ /JAMon Label=(com\.company.*), Units=.*/) {
          my $name = $1;

          $temp =~ /LastValue=(\d+)\.\d+, Hits=(\d+)\.\d+, Avg=(\d+\.\d+), Total=(\d+\.[\d|E]+), Min=(\d+)\.\d+, Max=(\d+).* First Access=(\S+ \S+ \d{2} \d{2}\:\d{2}\:\d{2} \S+ \d{4}), Last Access=(\S+ \S+ \d{2} \d{2}\:\d{2}\:\d{2} \S+ \d{4})/;
          $Stats->{$name}->{LastValue} = $1;
          $Stats->{$name}->{Hits}      = $2;
          $Stats->{$name}->{Avg}       = $3;
          $Stats->{$name}->{Total}     = $4;
          $Stats->{$name}->{Min}       = $5;
          $Stats->{$name}->{Max}       = $6;
          $Stats->{$name}->{First_Access} = $7;
          $Stats->{$name}->{Last_Access}  = $8;
          $Stats->{$name}->{method}       = $name;
       }

    }

    my $header = sprintf("\n%-82s %10s %8s %11s %10s %8s %10s %30s %30s\n", "Method (times in msec.)", "LastValue", "Hits", "Avg", "Total", "Min", "Max", "First Access", "Last Access");
    print "$header";
    print "-" x length($header), "\n";
    foreach my $method (keys %{$Stats}) {

        $Stats->{$method}->{method} =~ s/com.company.configmgr.server.//;

        printf("%-82s %10s %8s %10.3f %11s %8s %10s %30s %30s\n", $Stats->{$method}->{method}, $Stats->{$method}->{LastValue}, $Stats->{$method}->{Hits}, $Stats->{$method}->{Avg}, $Stats->{$method}->{Total}, $Stats->{$method}->{Min}, $Stats->{$method}->{Max}, $Stats->{$method}->{First_Access}, $Stats->{$method}->{Last_Access});
    }
}

GetStatistics();

